const express = require('express')
const routes = express.Router()
const adminRoutes = require('./app/controllers/admin.js')
const websiteRoutes = require('./app/controllers/website.js')


module.exports = routes

routes.get('/', websiteRoutes.index) 
routes.get('/about', websiteRoutes.about)
routes.get('/recipes', websiteRoutes.recipes)
routes.get('/recipes/:id', websiteRoutes.recipe)

// ADMINISTRATIVE AREA
routes.get("/admin/recipes", adminRoutes.index)
routes.get("/admin/recipes/create", adminRoutes.create)
routes.get("/admin/recipes/:id", adminRoutes.show)
routes.get("/admin/recipes/:id/edit", adminRoutes.edit)
routes.post("/admin/recipes", adminRoutes.post)
routes.put("/admin/recipes", adminRoutes.put)
routes.delete("/admin/recipes", adminRoutes.delete)
