"use strict";
// use user table
const User = use("App/Models/User");
const Database = use("Database");
// use for update password
const Hash = use("Hash");
class UserController {
  // function register user
  async register({ request, response }) {
    try {
      // get form data
      const { username, email, password } = request.all();
      const user = await User.create({
        username,
        email,
        password,
        status: 1,
      });
      // console.log(user)
      //   const isCheck = 1;
      return user;
    } catch (error) {
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }

  // function for login route
  async login({ request, auth, response }) {
    try {
      // console.log("login try");
      // console.log(request.all());
      // get form data
      const { email, password } = request.all();
      // check email exist or not
      const userInfo = await User.findBy("email", email);
      if (userInfo == null) {
        return "Sorry, this email is not recognized";
      }

      // check password match or not
      const passwControl = await Hash.verify(password, userInfo.password);
      if (!passwControl) {
        return "Password doesn't match";
      }

      // login user
      const authenticate = await auth.attempt(email, password);
      const user_token = authenticate.token;

      // return user_token;
      // console.log(user_token);
      // return
      const user = await User.query()
        .where("email", email)
        // .select("id", "is_active")
        .select("id")
        .first();

      // console.log(user);
      // return

      const userId = user.id;
      //   const userActive = user.is_active;

      return response.json({
        user_token,
        userId,
        // userActive,
      });
    } catch (error) {
      // console.log(error)
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }
  // user login info
  async userInfo({ auth, response, request }) {
    try {
      // console.log("userInfotry");
      // console.log(request.headers());
      // const user = await auth.getUser();

      const user = await User.query()
        .where("id", auth.user.id)
        .setHidden(["password"])
        .first();
      // console.log(user.toJSON(), "userInfo");
      return user;
    } catch (error) {
      // console.log(error);
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }
  // get all user
  async view({ auth, response }) {
    try {
      const user = await auth.getUser();
      // console.log(user);
      const userDetails = await Database.table("users")
        .whereNot("id", user.id)
        .select("id", "username");
      return userDetails;
    } catch (error) {
      // console.log(error);
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }
}

module.exports = UserController;
