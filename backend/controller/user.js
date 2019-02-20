class UserController {

  static index(request, response){
    response.json({
      page: "user"
    });
  }

}

module.exports = UserController;
