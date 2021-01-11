"use strict";
// use blogs table
const Blog = use("App/Models/Blog");
const Database = use("Database");
class PostController {
  // view post
  async view({ auth, response, request }) {
    try {
      // get user data
      // const user = await auth.getUser();
      // get all post
      const allPost = await Database.table("blogs").select(
        "title",
        "post",
        "user_id"
      );
      return allPost;
    } catch (error) {
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }
  // create propsData
  async create({ request, response }) {
    try {
      // get user data
      // const user = await auth.getUser();
      // get form data
      const { title, post, user_id } = request.all();
      const blog = new Blog();
      blog.fill({
        title,
        post,
        user_id
      })
      await blog.save();
      return blog;
      
    } catch (error) {
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }
}

module.exports = PostController;
