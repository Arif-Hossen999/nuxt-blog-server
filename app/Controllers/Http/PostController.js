"use strict";
// use blogs table
const Blog = use("App/Models/Blog");
const Database = use("Database");
const AuthorizationService = use('App/Services/AuthorizationService');
class PostController {
  // view post
  async view({ auth, response, request }) {
    try {
      // get user data
      // const user = await auth.getUser();
      // get all post
      const allPost = await Database.table("blogs")
      .where('blogs.status', 1)
        .select(
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
  // view my post
  async viewMyPost({ auth, response, request }) {
    try {
      // get user data
      const user = await auth.getUser();
      // console.log(request.headers());
      // get my post
      const myPost = await Database.table("blogs")
        .where("user_id", user.id)
        .where('blogs.status', 1)
        .select("id","title", "post", "user_id");
      return myPost;
    } catch (error) {
      console.log(error);
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
      // console.log(user_id);
      // return
      const blog = new Blog();
      blog.fill({
        title,
        post,
        user_id,
        status:1,
      });
      await blog.save();
      return blog;
    } catch (error) {
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }
  // edit post
  // async edit({ auth , params, response}) {
  //   try {
  //     const user = await auth.getUser()
  //     // get id for edit
  //     const { id } = params;
  //     // find data for post edit
  //     const postEditData = await Blog.find(id);
  //     return postEditData;
  //   } catch (error) {
  //     return response.status(500).send({
  //       error: "Something went wrong",
  //     });
  //   }
  // }
  // update post
  async update({ auth, request, params, response }) {
    try {
      // get user data
      const user = await auth.getUser();
      const userId = user.id
      // get id for update
      const { id } = params;
      // find data for post update
      const postUpdate = await Blog.find(id);
      const postUserId = postUpdate.user_id;
      
      const { title, post} = request.all();
      // Authorization Permission
      AuthorizationService.verifyPermission(userId, postUserId);
      const update = await Database.table('blogs')
        .where('blogs.id', postUpdate.id)
        .update({
          'title': title,
          'post': post
        })
        return update;
      
    } catch (error) {
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }
  // delete post
  async delete({auth, params, response}) {
    try {
      const user = await auth.getUser();
      const userId = user.id
      // get id for update
      const { id } = params;
      // find data for post update
      const postDelete = await Blog.find(id);
      const postUserId = postDelete.user_id;
      // Authorization Permission
      AuthorizationService.verifyPermission(userId, postUserId);
      // delete post
      postDelete.status = 0;
      await postDelete.save();
      return postDelete;
    } catch (error) {
      return response.status(500).send({
        error: "Something went wrong",
      });
    }
  }
}

module.exports = PostController;
