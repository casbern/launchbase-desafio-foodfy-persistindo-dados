const db = require("../../config/db")
const {date} = require("../lib/utils")

module.exports = {
  all(callback) {
     db.query(`
     SELECT * FROM recipes
     ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`
      callback(results.rows)
     })
  },
  create(data, callback) {
    const query = `
    INSERT INTO recipes (
      image,
      title,
      name,
      ingredients,
      preparation,
      information,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `
    
    const values = [
      data.image,
      data.title,
      data.name,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]
    console.log(values)

    db.query(query, (err, results) => {
      if(err) throw `Database Error! ${err}`
      callback(results.rows[0])
    })
  }
} 