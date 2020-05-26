//const Chef = require('../../models/chef')

module.exports = {
  index(req, res) {
    return res.send("I am the index")
  },

  create(req,res) {
    return res.render("admin/chefs/create")
  }
}