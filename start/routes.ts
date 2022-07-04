/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
const apiPrefix = 'api/'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post("api/login", "Auth/AuthController.login");

function protectedRoutes() {
  Route.get("/get-games-details", "User/UserController.getUserGames");

  Route.post("/insert-game-details", "User/UserController.insertGameDetails");

}
Route.group(protectedRoutes).prefix(`${apiPrefix}users`);
