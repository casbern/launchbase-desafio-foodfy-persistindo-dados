const Recipe = require("../../models/recipe")
const fs = require("fs")

module.exports = {
  index(req, res) {
    console.log("index executed")
    Recipe.all( (recipes) => {
      console.log("Recipes in controllers:")
      console.log(recipes)
      return res.render("admin/recipes/index", {recipes}) 
    })
  },

  create(req, res) {
    return res.render("admin/recipes/create")
  },
  
  post(req, res) {
    console.log("req.body")
    console.log(req.body)
    //==
    const keys = Object.keys(req.body)
    keys.pop() //pop() method returns the deleted item of the array.

    console.log("I am the keys")
    console.log(keys)

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Please fill all the gaps")
      }
    }

    Recipe.create(req.body, (recipe) => {
      return res.redirect(`/recipes/${recipe.id}`)
    })
  },
  
  show(req, res) {
    const {id} = req.params
  
    const foundRecipe = data.recipes.find(function(recipe) {
      return recipe.id == id
    })
  
    if (!foundRecipe) {
      return res.send("Recipe was not found!")
    }
  
    const recipe = {
      ...foundRecipe
    }
  
    return res.render("admin/recipes/show", {recipe})
  },
  
  edit(req, res) {
    const {id} = req.params
    const foundRecipe = data.recipes.find(function (recipe) {
      return recipe.id == id
    })
  
    if (!foundRecipe) {
      return res.send("Recipe was not found!")
    }
    
    const recipe = {
      ...foundRecipe
    }
  
    return res.render("admin/recipes/edit", {recipe})
  },
  
  put(req, res) {
    const {id} = req.body
    let index = 0
  
    const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
      if (id == recipe.id) {
        index = foundIndex
        return true
      }
    })
  
    if(!foundRecipe) {
      return res.send("Recipe was not found!")
    }
  
    // console.log("foundRecipe") //* for debugging purposes
    // console.log(foundRecipe)
  
    // console.log("req.body")
    // console.log(req.body)
  
  
      const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
      }
  
      data.recipes[index] = recipe
  
      fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")
    
        return res.redirect(`/admin/recipes/${id}`)
      })
  },
  
  delete(req, res) {
    const {id} = req.body
  
    const filteredRecipes = data.recipes.filter(function (recipe) {
      return recipe.id != id
    })
  
    data.recipes = filteredRecipes
  
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) return res.send("Write error!")
  
      return res.redirect("/admin/recipes") 
    })
  }
}



