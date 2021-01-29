const express = require('express')
const cors = require('cors')
const { loginUser, sql, poolPromise } = require('./modules/mssql/modules/config')
const { userCheck } = require('./modules/mssql/modules/nedb')
const { decrypt } =require('./modules/mssql/modules/crypto')
const requestIp = require('request-ip')

// jwt
const jwt = require('jsonwebtoken')

// CORS
let corsOptions = {
  origin: "*",
  methods: ['GET', 'POST'],
  exposedHeaders: ['code']
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

app.disable('x-powered-by')

// 驗證token
app.use(function (req, res, next) {
  let token = req.headers['authorization']
  if (token) {
    jwt.verify(token, 'seeLove_83799375', async function (err, decoded) {
      // 解碼失敗
      if (err) {
        const { name, message } = err

        res.status(401)
        return res.json({success: false, name: name, message: message})
      } else {
        // 解碼成功
        req.decoded = decoded

        // 檢查是否重複登入
        let multipleLoginIP = await userCheck(req.decoded.UserID, token)
        if (multipleLoginIP !== ''){
          res.status(401)
          return res.json({success: false, name: 'MultipleLogin', message: 'IP: '+multipleLoginIP })
        }
        next()
      }
    })
  } else {
    // 如果沒有token, 又是登入頁面來的, 就pass
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
    IP: requestIp.getClientIp(req),
    Device: req.headers['user-agent'],
    Token: '',
    CMD: req.originalUrl,
    Data: JSON.stringify(req.body)
  }

  if (req.decoded){
    form.UserID = req.decoded.UserID
    form.Token = req.headers['authorization']
  } else {
    if(req.body.UserID){
      form.UserID = decrypt(req.body.UserID)
    }
  }
  const pool = await poolPromise
  pool.request()
    .input('UserID', sql.NVarChar, form.UserID)
    .input('IP', sql.NVarChar, form.IP? form.IP:'')
    .input('Device', sql.NVarChar, form.Device)
    .input('Token', sql.NVarChar, form.Token)
    .input('CMD', sql.NVarChar, form.CMD)
    .input('Data', sql.NVarChar, form.Data)
    .execute('common_CmdLog')

  loginUser.userID = form.UserID
  loginUser.IP = form.IP

  next()
})

// 自定內容
app.use('/login', require('./modules/mssql/login'))
app.use('/settings', require('./modules/mssql/settings'))
app.use('/basic', require('./modules/mssql/basic'))
app.use('/orders', require('./modules/mssql/orders'))
app.use('/reports', require('./modules/mssql/reports'))
app.use('/signOff', require('./modules/mssql/signOff'))
app.use('/stock', require('./modules/mssql/stock'))

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
