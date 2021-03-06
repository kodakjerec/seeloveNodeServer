const sql = require('mssql')
// jwt
const jwt = require('jsonwebtoken')

const config = {
  user: 'gl',
  password: 'Gl83799375',
  server: '192.168.2.210', // You can use 'localhost\\instance' to connect to named instance
  database: 'gl100bak',
  cryptKey: 'seeLove_83799375'
}
const loginUser = {
  userID: '',
  IP: ''
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

// 失敗回應
const errorResponse = function (response, error) {
  response.header('code',error.code)
  response.json( {result: error})
}

// 成功回應
const successResponse = function (response, result) {
  response.header('code', '200')
  response.json(result)
}

const jwtSign = function (UserID) {
  let result = jwt.sign({
    UserID: UserID
  },config.cryptKey,{
    expiresIn: "1 days"
  })

  return result
}

module.exports = {
  loginUser, config, sql, poolPromise, errorResponse, successResponse, jwtSign
}
