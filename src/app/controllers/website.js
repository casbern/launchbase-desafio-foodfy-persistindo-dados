const data = require("../../../data.json")

exports.index = function(req, res) {
  return res.render("index", { items: data.recipes.slice(0,6) } )
}

exports.about = function(req, res) {
  return res.render("about")
}

exports.recipes = function(req, res) {
  return res.render("recipes", { items: data })
}

exports.recipe = function(req, res) {

  const { id: recipeId } = req.params
  
  const recipe = data.recipes[recipeId]
  
  if (!recipe) return res.send('Recipe not found!')
  
  return res.render('recipe', { item: recipe })
  }