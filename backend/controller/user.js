const config = require('../../config/user.config.js');
const validator = require('validator');
const UserModel = require(config.getPath('backend/model/user'));

class UserController {

    /*
    * error codes:
    * 1 - не валидный логин
    * 2 - несоответствие паролей
    * 3 - неверная длина пароля
    * 4 - данный логин уже занят
    * 5 - нет соответствия логин пасс
    * */

    static async index(request, response){
        //псевдо restful
        switch (request.method) {
            case 'POST':
                //регистрация
                const user = request.body;
                let respPost = {error: [], add: false};
                if (typeof user.login === 'undefined' || !validator.isEmail(user.login)) respPost.error.push(1);
                if (typeof user.pass === 'undefined' || typeof user.passConfirm === 'undefined') respPost.error.push(3);
                if (respPost.error.length === 0) {
                    //делаем фильтрацию идентичную фронту
                    if (!validator.equals(user.pass, user.passConfirm)) respPost.error.push(2);
                    if (user.pass.length < 6 && user.pass.length > 255) respPost.error.push(3);
                    if (respPost.error.length === 0 && await UserModel.add(user)) {
                        respPost.add = true
                    } else respPost.error.push(4);
                }
                response.json(respPost);
                break;
            case 'PUT':
                //восстановление пароля
                let respPut = {error: [], newPass: false};
                if (typeof request.body.login === 'undefined' || !validator.isEmail(request.body.login))
                    respPut.error.push(1);
                if (respPut.error.length === 0) {
                    const newPass = await UserModel.edit(request.body.login);
                    if (newPass)
                        respPut.newPass = newPass;
                    else
                        respPut.error.push(5);
                }
                response.json(respPut);
                break;
            case 'DELETE':
                //реализация не нужна
                response.send('');
                break;
            case 'OPTIONS':
                //cors
                response.send('');
                break;
            case 'GET':
                if (typeof request.query.login !== 'undefined' && validator.isEmail(request.query.login)) {
                    response.send(await UserModel.get(request.query.login) === undefined ? 'false' : 'true');
                } else response.send('false');
                break;
        }
    }

    static async auth(request, response) {
        switch (request.method) {
            case 'POST':
                //авторизация
                let resp = {error: [], token: ''};
                const user = request.body;
                if (
                    typeof user.login === 'undefined'
                    || !validator.isEmail(user.login)
                ) resp.error.push(1);
                if (
                    typeof user.pass === 'undefined'
                    || user.pass.length < 6
                    || user.pass.length > 255
                ) resp.error.push(3);
                if (resp.error.length === 0) {
                    const auth = await UserModel.auth(user);
                    if (auth) resp.token = auth; else resp.error.push(5);
                }
                response.json(resp);
                break;
            case 'GET':
                //проверка авторизации
                if (
                    typeof request.query.token !== 'undefined'
                    && new RegExp('^[\$a-zA-Z0-9\.\/]+').test(request.query.token)
                )
                    response.send(await UserModel.authCheck(request.query.token));
                else
                    response.send('false');
                break;
        }
    }
}

module.exports = UserController;
