const express = require('express')

const router = express.Router()
const { sql, poolPromise, successResponse, errorResponse, jwtSign } = require('./modules/config')
const { userInsert, userRemove } = require('./modules/nedb')
const { decrypt } =require('./modules/crypto')

// get用法
// router.get('/', function(req, res) {
//   res.send('home page!')
// })

// 下載檔案用法
// router.get('/storageAddressExportExcel', async (req, res) => {
//   try {
//     let workbook = new exceljs.Workbook()
//     let worksheet = workbook.addWorksheet('Detail')

//     const pool = await poolPromise
//     const queryResult = await pool.request()
//       .input('type', sql.NVarChar, 'storageAddress')
//       .input('keyword', sql.VarChar, 'SKU301')
//       .input('locale', sql.VarChar, req.headers['clientlocale'])
//       .execute('basic_GetObject')

//       let columnIndex = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
//       let i=0
//       Object.getOwnPropertyNames(queryResult.recordset[0]).forEach(column => {
//         // 計算excel欄位從A~Z AA~ZZ
//         let columnName = ''
//         if (i<26) {
//           columnName = columnIndex[i]
//         } else {
//           columnName = columnIndex[(i/26)-1]  // 第一位英文
//           columnName += columnIndex[i%26]
//         }
//         worksheet.getCell(columnName+'1').value = column
//         i++
//       })

//       let filename = 'test.xlsx' //生成的檔名

//       //檔案生成成功後執行的操作
//       res.header('code', '200')
//       res.attachment(filename)
//       await workbook.xlsx.write(res)
//       res.end()
    
//   } catch (err) {
//     res.status(500)
//     res.send(err.message)
//   }
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

    if (result.recordset[0]['message'] === ''){
      token = jwtSign(UserID)
    } else {
      errorResponse(res, result.recordset[0])
      return
    }

    userInsert(UserID, token)
    
    successResponse(res, { 
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
    
    userRemove(UserID)

    successResponse(res, {})
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

    successResponse(res, result)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/version', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .execute('login_Version')

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/checkPwd', async (req, res) => {
  try {
    let UserID = decrypt(req.body.UserID)
    let Password = req.body.Password
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('UserID', sql.NVarChar, UserID)
      .input('Password', sql.NVarChar, Password)
      .execute('login')
    
      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
