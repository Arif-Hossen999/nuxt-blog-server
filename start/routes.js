'use strict'

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
const Route = use('Route')

Route.group( () => {
  // Route for user registration
  Route.post("/auth/register", "UserController.register").validator(
    "CreateUser"
  );

  // Route for user login
  Route.post("/auth/login", "UserController.login").validator("LoginUser");

  // Route for get all post
  Route.get("/allpost", "PostController.view");
}).prefix("api");
