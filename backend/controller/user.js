const config = require('../../config/user.config.js');
const userModel = require(config.getPath('backend/model/user'));

class UserController {

  static index(request, response){
    switch (request.method) {
      case 'post':
        userModel.add();
        break;
      case 'put':
        userModel.edit();
        break;
      case 'delete':

        break;
      case 'options':

        break;
      default:
        userModel.get();
        break;
    }

    response.json({
      page: "user"
    });
  }

}

module.exports = UserController;
