const { Pool } = require('pg')

const pg = new Pool ({
    user: "cassiabernardo",
    password: "",
    host: "localhost",
    port: 5432,
    database: "foodfy"
})

async function getResults(query, values) {
    let res

    try {
        res = await pg.query(query, values)
        console.log(res.rows[0])
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log(err.stack)
    }
    return res.rows
}


module.exports = getResults
