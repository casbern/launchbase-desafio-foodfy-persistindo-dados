const db = require("../../config/db")
const {date} = require("../lib/utils")

module.exports = {
  all(callback) {
    db.query(`
    SELECT * FROM chefs
    ORDER BY name ASC`, (err, results) => {
     if(err) throw `Database Error! ${err}`
     callback(results.rows)
    })
 },

 create(data, callback) { 
  const query = `
  INSERT INTO chefs (
    avatar_url,
    name,
    created_at
  ) VALUES ($1, $2, $3)
  RETURNING id
  `
  const values = [
    data.avatar_url,
    data.name,
    date(Date.now()).iso
  ]

  db.query(query, values, (err, results) => {
    if(err) throw `Database Error! ${err}`
    callback(results.rows[0])
  }) 
},

find(id, callback) {
  db.query(`
  SELECT * FROM chefs
  WHERE id=$1
  `, [id], (err, results) => {
    if(err) throw `Database Error! ${err}`
    callback(results.rows[0])
  })
},
}