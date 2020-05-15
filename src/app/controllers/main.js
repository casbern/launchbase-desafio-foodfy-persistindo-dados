const data = require("../../../data.json")

module.exports = {
  index(req, res) {
    return res.render("index", { items: data.recipes.slice(0,6) } )
  },
  
  about(req, res) {
    return res.render("about")
  },
  
  recipes(req, res) {
    return res.render("recipes", { items: data })
  },
  
  recipe(req, res) {
  
    const { id: recipeId } = req.params
    
    const recipe = data.recipes[recipeId]
    
    if (!recipe) return res.send('Recipe not found!')
    
    return res.render('recipe', { item: recipe })
  }
}

