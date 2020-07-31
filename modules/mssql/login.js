const express = require('express')
// jwt
const jwt = require('jsonwebtoken')

const router = express.Router()
const { sql, poolPromise } = require('./modules/config')
const { decrypt } =require('./modules/crypto')

// router.get('/', function(req, res) {
//   res.send('home page!')
// })

router.post('/login', async (req, res) => {
  try {
    let token = ''
    let UserID = decrypt(req.body.UserID)
    let Password = req.body.Password
    const pool = await poolPromise
    const result = await pool.request()
      .input('UserID', sql.NVarChar, UserID)
      .input('Password', sql.NVarChar, Password)
      .execute('login')

    if (result.recordset[0]['code'] === 200){
      token = jwt.sign({
        UserID: UserID,
        lastTime: new Date()
      },'seeLove_83799375')
    } else {
      res.status(401)
    }
    
    res.json({ 
      result: result.recordset,
      token: token
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/logout', async (req, res) => {
    let UserID = decrypt(req.body.UserID)
    const pool = await poolPromise
    pool.request()
      .input('UserID', sql.NVarChar, UserID)
      .execute('login_Logout')
    
    res.json({})
})

router.post('/getMenu', async (req, res) => {
  try {
    let UserID = decrypt(req.body.UserID)
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('UserID', sql.NVarChar, UserID)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('login_GetMenu')

    let result = []
    
    // Level 1
    result = queryResult.recordset.filter(item=>{
      return item.ParentID === '0'
    })

    // Level 2
    result.forEach(parentItem=>{
      parentItem.subMenu = queryResult.recordset.filter(item=>{
        return item.ParentID === parentItem.ProgID
      })
    })

    res.json(result)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
