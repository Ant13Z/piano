const config = require('../../config/user.config.js');
const db = require(config.getPath('backend/connect'));

/*db.each("SELECT count(*) FROM users", (err, row) => {
    console.log(row);
});*/

class UserModel {

    static add(){

    }

    static edit(){

    }

    static get(){

    }

}

module.exports = UserModel;
