const data = require("../../../data.json")
const fs = require("fs")


exports.index = function(req, res) {
  return res.render("admin/index", {recipes: data.recipes})
}

exports.create = function(req, res) {
  return res.render("admin/create")
}

exports.post = function(req, res) {
  const keys = Object.keys(req.body)

  let {
    recipe_avatar,
    recipe_name,
    recipe_author,
    ingredients,
    preparation,
    extra_information
  } = req.body

  const lastRecipe = data.recipes[data.recipes.length - 1]
  let id

  if (lastRecipe) {
    id = lastRecipe.id + 1
  } else {
    id = 1
  }

  data.recipes.push({
    id,
    recipe_avatar,
    recipe_name,
    recipe_author,
    ingredients,
    preparation,
    extra_information
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write file error")
    }
    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.show = function(req, res) {
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

  return res.render("admin/show", {recipe})
}

exports.edit = function(req, res) {
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

  return res.render("admin/edit", {recipe})
}

exports.put = function(req, res) {
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
}

exports.delete = function(req, res) {
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