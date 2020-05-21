const Recipe = require("../models/recipe")

module.exports = {
  index(req, res) {
    Recipe.all( (recipes) => {
      //console.log("Recipes in controllers:")
      //console.log(recipes)
      return res.render("index", {recipes: recipes.slice(0,6)}) 
  })
  },
  
  about(req, res) {
    return res.render("about")
  },
  
  recipes(req, res) {
    Recipe.all( (recipes) => {
      //console.log("This route with all recipes was called")

      //console.log("Recipes in controllers:")
      //console.log(recipes)
      return res.render("recipes", { recipes })
    })
  }, 
  
  recipe(req, res) {
    Recipe.find(req.params.id, (recipe) => {
      //console.log("Enter inside the route")
      console.log(req.params.id)
      console.log(recipe)

      if(!recipe) return res.status(400).send("Recipe not found")
      return res.render("recipe", {recipe})
    })
  }
}

