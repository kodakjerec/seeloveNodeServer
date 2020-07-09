const express = require('express')
const cors = require('cors')

// jwt
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())

// 驗證token
app.use(function (req, res, next) {
  var token = req.headers['authorization']
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

// 自定內容
app.use('/login', require('./modules/mssql/login'))
app.use('/settings', require('./modules/mssql/settings'))
app.use('/basic', require('./modules/mssql/basic'))
app.use('/orders', require('./modules/mssql/orders'))

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
