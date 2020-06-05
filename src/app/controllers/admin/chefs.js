const Chef = require('../../models/chef')

module.exports = {
  index(req, res) {
    Chef.all( (chefs) => {
      return res.render("admin/chefs/index", {chefs}) 
    })
  },

  create(req,res) {
    return res.render("admin/chefs/create")
  }, 

  post(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Please fill all the gaps")
      }
    }

    Chef.create(req.body, (chef) => {
      return res.redirect(`/admin/chefs/${chef.id}`)
    })
  },

  show(req, res) {
    Chef.find(req.params.id, ({chef, recipes}) => {
      if(!chef) return res.send("Chef not found")

      return res.render("admin/chefs/show", {chef, recipes})
    })
  },
}