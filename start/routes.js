"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  // Route for user registration
  Route.post("/auth/register", "UserController.register").validator(
    "CreateUser"
  );

  // Route for user login
  Route.post("/auth/login", "UserController.login").validator("LoginUser");
  Route.get("/auth/user", "UserController.userInfo").middleware(["auth:jwt"]);
  // Route for post
  Route.get("/allpost", "PostController.view");
  Route.get("/mypost", "PostController.viewMyPost").middleware("auth");
  Route.post("/create/post", "PostController.create")
    .validator("CreatePost")
    .middleware("auth");
  // Route.get("/post/edit/:id","PostController.edit")
  Route.patch("/post/:id", "postController.update").middleware("auth");
  Route.delete("/post/:id", "postController.delete").middleware("auth");
  // Route for upload image
  Route.post("/images", "ImageController.upload").middleware("auth");
  Route.get("/images", "ImageController.view").middleware("auth");
  Route.patch("/images/:id", "ImageController.update").middleware("auth");
  Route.delete("/images/:id", "ImageController.destroy").middleware("auth");
}).prefix("api");
