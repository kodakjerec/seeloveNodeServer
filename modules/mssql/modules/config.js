const sql = require('mssql')
const config = {
  user: 'seelove',
  password: 'Seelove83799375',
  server: '192.168.1.210', // You can use 'localhost\\instance' to connect to named instance
  database: 'seelove100'
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

const errorResponse = function (response, error) {
  response.header('code',error.code)
  response.send(error.message)
}

const successResponse = function (response, result) {
  response.header('code', '200')
  response.json(result)
}

module.exports = {
  sql, poolPromise, errorResponse, successResponse
}
