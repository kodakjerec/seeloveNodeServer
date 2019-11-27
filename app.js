const express = require('express')
const cors = require('cors')
// 自定內容
const baseData = require('./modules/mssql/baseData')

const app = express()
app.use(express.json())
app.use(cors())

// 自定內容
app.use('/baseData', baseData)

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
