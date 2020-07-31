const express = require('express')
const cors = require('cors')
const { sql, poolPromise } = require('./modules/mssql/modules/config')
const { decrypt } =require('./modules/mssql/modules/crypto')

// jwt
const jwt = require('jsonwebtoken')

// CORS
let corsOptions = {
  origin: ['http://192.168.1.20:3001', 'http://192.168.1.104:8080', 'http://localhost:8080' ],
  methods: ['GET', 'POST']
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

// 驗證token
app.use(function (req, res, next) {
  let token = req.headers['authorization']
  if (token) {
    jwt.verify(token, 'seeLove_83799375', function (err, decoded) {
      if (err) {
        res.status(401)
        return res.json({success: false, message: 'Failed to authenticate token.'})
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    if (req.originalUrl.indexOf('/login')>=0) {
      next()
    } else {
      res.status(401)
      return res.json({success: false, message: 'No authenticate token.'})
    }
  }
})

// 操作紀錄
app.use(async function (req, res, next) {
  let form = {
    UserID: '',
    IP: ( req.headers["x-forwarded-for"] || "").split(",").pop() ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress,
    Device: req.headers['user-agent'],
    Token: '',
    CMD: req.originalUrl,
    Data: JSON.stringify(req.body)
  }
  if (req.decoded){
    form.UserID = req.decoded.UserID
    form.Token = req.headers['authorization']
  } else {
    form.UserID = decrypt(req.body.UserID)
  }
  const pool = await poolPromise
  pool.request()
    .input('UserID', sql.NVarChar, form.UserID)
    .input('IP', sql.NVarChar, form.IP)
    .input('Device', sql.NVarChar, form.Device)
    .input('Token', sql.NVarChar, form.Token)
    .input('CMD', sql.NVarChar, form.CMD)
    .input('Data', sql.NVarChar, form.Data)
    .execute('common_CmdLog')

  next()
})

// 自定內容
app.use('/login', require('./modules/mssql/login'))
app.use('/settings', require('./modules/mssql/settings'))
app.use('/basic', require('./modules/mssql/basic'))
app.use('/orders', require('./modules/mssql/orders'))
app.use('/reports', require('./modules/mssql/reports'))

const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Example app listening at http://${host}:${port}`)
})

/* 刪除沒用的port
// linux
$ lsof -i tcp:3000
$ kill -9 PID

// windows
netstat -ano | findstr :3000
tskill typeyourPIDhere
*/
