const Recipe = require("../models/recipe")

module.exports = {
  index(req, res) {
    Recipe.all( (recipes) => {
      //console.log("Recipes in controllers:")
      //console.log(recipes)
      return res.render("index", {items: recipes.slice(0,6)}) 
  })
  },
  
  about(req, res) {
    return res.render("about")
  },
  
  recipes(req, res) {
    //return res.render("recipes", { items: data })
  },
  
  recipe(req, res) {
  
    // const { id: recipeId } = req.params
    
    // const recipe = data.recipes[recipeId]
    
    // if (!recipe) return res.send('Recipe not found!')
    
    // return res.render('recipe', { item: recipe })
  }
}

