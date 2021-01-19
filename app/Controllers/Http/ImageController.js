"use strict";
const Image = use("App/Models/Image");
const Database = use("Database");
// uer for upload image
const Helpers = use("Helpers");
// create random value for image name
const moment = require("moment");
const AuthorizationService = use("App/Services/AuthorizationService");
class ImageController {
  // view user image
  async view({ auth, response }) {
    try {
      // get user data
      const user = await auth.getUser();
      // get user image
      const userImage = await Database.table("images")
        .where("user_id", user.id)
        .where("status", 1)
        .select("images.image_url");
      return userImage;
    } catch (error) {
      return response.status(500).send({
        error: "Image does not exist",
      });
    }
  }
  // upload user image
  async upload({ response, request, auth }) {
    try {
      // console.log(request.file('image').toJSON());
      // get user data
      const user = await auth.getUser();
      // get user id
      // const user_id = request.input("user_id");
      // get user image
      const image_url = request.file("image", {
        types: ["image"],
        size: "2mb",
      });
      // console.log(image_url, "image_url");
      // create image name
      const imageName = moment().utc() + "_imagename-name.jpg";
      // move image into public folder
      await image_url.move(Helpers.publicPath("uploads"), {
        name: imageName,
        overwrite: true,
      });
      if (!image_url.moved()) {
        return image_url.error();
      }
      // access image table
      const image = new Image();
      // insert image into image table
      image.fill({
        image_url: imageName,
        status: 1,
        user_id: user.id,
      });
      await image.save();
      return image;
    } catch (error) {
      // console.log(error);
      return response.status(500).send({
        error: "Image upload failed",
      });
    }
  }
}

module.exports = ImageController;
