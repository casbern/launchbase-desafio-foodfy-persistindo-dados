const express = require('express')
const routes = express.Router()
const chefs = require('./app/controllers/admin/chefs.js')
const recipes = require('./app/controllers/admin/recipes.js')
const main = require('./app/controllers/main.js')


module.exports = routes

routes.get('/', main.index) 
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:id', main.recipe)

// ADMINISTRATIVE AREA
//RECIPES
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

//CHEFS