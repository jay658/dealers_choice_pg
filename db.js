const pg = require('pg')

const client = new pg.Client('postgres://localhost/mydata')

client.connect()

module.exports = client;