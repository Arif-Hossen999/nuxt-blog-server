"use strict";

class CreateUser {
  get rules() {
    return {
      // validation rules
      username: "required",
      email: "required|unique:users",
      password: "required",
    };
  }

  get messages() {
    return {
      required: "{{ field }} is required.",
      unique: "This {{ field }} has already been taken.",
    };
  }

  async fails(error) {
    return this.ctx.response.send(error);
  }
}

module.exports = CreateUser;
