const Recipe = require("../../models/recipe")

module.exports = {
  index(req, res) {
    Recipe.all( (recipes) => {
      //console.log("Recipes in controllers:")
      //console.log(recipes)
      return res.render("admin/recipes/index", {recipes}) 
    })
  },

  create(req, res) {
    return res.render("admin/recipes/create")
  },
  
  post(req, res) {
    //console.log("req.body")
    //console.log(req.body)
    //==
    const keys = Object.keys(req.body)
    keys.pop() //pop() method returns the deleted item of the array.

    //console.log("I am the keys")
    //console.log(keys)

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Please fill all the gaps")
      }
    }

    Recipe.create(req.body, (recipe) => {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })
  },
  
  show(req, res) {
    Recipe.find(req.params.id, (recipe) => {
      if(!recipe) return res.send("Recipe not found")
      return res.render("admin/recipes/show", {recipe})
    })
  
  },
  
  edit(req, res) {
    Recipe.find(req.params.id, (recipe) => {
      if(!recipe) return res.send("Recipe not found")
      return res.render("admin/recipes/edit", {recipe})
    })
  },
  
  put(req, res) {
    Recipe.update(req.body, () => {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },
  
  delete(req, res) {
    console.log("req.body.id")
    console.log(req.body.id)

    console.log("req.params.id")
    console.log(req.params.id)

    Recipe.delete(req.body.id, () => {
      return res.redirect('/admin/recipes')
    })
    }
  }




