const express = require('express');
const expressWs = require('express-ws');
const router = express.Router();
expressWs(router);

wsUsers = []

function command(action, data) {
  let returnData = {
    action: action,
    data: data
  }
  return JSON.stringify(returnData)
}

router
.ws('/user', function (ws, req){
  ws.onmessage = (msg) => {
    console.log(msg.data)
    let action = JSON.parse(msg.data).action
    let data = JSON.parse(msg.data).data
    let target = JSON.parse(msg.data).target
    let returnData = ''
    switch (action) {
      // #region 共通
      // 先連線
      case 'login':
        ws.userId = data
        returnData = command('verbose', '使用者: '+ ws.userId + ' 上線. ID: ' + ws.id)
        ws.send(returnData)
        break
      // #region 給前端
      default:
        returnData = command(action, data)
        // 找出前端
        wsUsers = wss.getWss().clients
        wsUsers.forEach(wsUser =>{
          if (wsUser.readyState === ws.OPEN && wsUser.userId === target){
            wsUser.send(returnData)
            return
          }
        })
        break
    }
  }

  ws.onopen = () =>{
    console.log('WebSocket opened')
  }

  ws.onclose = () => {
    console.log('WebSocket '+ ws.id +' was closed')
  }

  ws.onerror = (e) =>{

  }
})

module.exports = router;