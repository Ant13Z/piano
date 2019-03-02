const bcrypt = require('bcrypt');
const config = require('../../config/user.config.js');
const db = require(config.getPath('backend/connect'));

class UserModel {

    static __generateString(length = 6) {
        let dict = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let str = '';
        for(let i = 0; i < length; i++)
            str += dict.charAt(Math.floor(Math.random() * dict.length));
        return str;
    }

    static async add(user) {
        let checkUser = await this.get(user.login);
        if (!checkUser) {
            bcrypt.hash(user.pass, config.saltRounds, (err, hash) => {
                db.run("insert into users (`email`, `pass`) values (?, ?)", [user.login, hash]);
            });
            return true;
        } else return false;
    }

    static async edit(userEmail) {
        const checkUser = await this.get(userEmail);
        if (checkUser) {
            const newPass = this.__generateString();
            bcrypt.hash(newPass, config.saltRounds, (err, hash) => {
                db.run("update users set `pass` = ? where `email` = ?", [hash, userEmail]);
            });
            return newPass;
        }
        return false;
    }

    static get(userEmail) {
        return new Promise((resolve, reject) => {
            db.get('select * from users where `email` = ?', [userEmail], (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        });
    }

    static async auth(user) {
        const checkUser = await this.get(user.login);
        if (checkUser) {
            if (await bcrypt.compare(user.pass, checkUser.pass)) {
                //данный хеш, в принципе, подойдет и для прода
                const token = await bcrypt.hash(checkUser.pass, config.saltRounds);
                db.run("insert into tokens (`user_id`, `token`) values (?, ?)", [checkUser.id, token]);
                return token;
            }
        }
        return false;
    }

    // не используется, т.к. проверка валидности токена на фронте бессмысленна
    static async authCheck(token) {
        return token === (await this.getToken(token)).token;
    }

    static getToken(token) {
        return new Promise((resolve, reject) => {
            db.get('select * from tokens where `token` = ?', [token], (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        });
    }
}

module.exports = UserModel;
