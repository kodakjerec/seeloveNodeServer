const express = require('express')
const expressWs = require('express-ws')
const cors = require('cors')
// 自定內容
const ws = require('./modules/webSocket/webSocket')

const app = express()
// webSocket
wss = expressWs(app)
app.use(express.json())
app.use(cors())

app.use('/ws', ws)

// 記錄clients
let id = 0
wss.getWss().on('connection', function (ws){
  ws.id = id++
})

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
