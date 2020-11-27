const express = require('express')

const router = express.Router()
const { sql, poolPromise, successResponse } = require('./modules/config')

router.post('/assign', async (req, res) => {
  try {
    let form = req.body.form

    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Type', sql.VarChar, form.Type)
      .input('Prefix', sql.VarChar, form.Prefix)
      .input('Status', sql.VarChar, form.Status)
      .input('ID', sql.VarChar, form.ID)
      .input('SignResult', sql.TinyInt, form.SignResult)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('signOff_Assign')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/permissionNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('Seq', sql.BigInt, form.Seq)
    .input('ParentSeq', sql.BigInt, form.ParentSeq)
    .input('UserType', sql.TinyInt, form.UserType)
    .input('ID', sql.VarChar, form.ID)
      .execute('signOff_PermissionNew')

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
router.post('/permissionEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('Seq', sql.BigInt, form.Seq)
    .input('ParentSeq', sql.BigInt, form.ParentSeq)
    .input('UserType', sql.TinyInt, form.UserType)
    .input('ID', sql.VarChar, form.ID)
      .execute('signOff_PermissionEdit')

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
router.post('/permissionDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('Seq', sql.BigInt, form.Seq)
    .input('ParentSeq', sql.BigInt, form.ParentSeq)
      .execute('signOff_PermissionDelete')

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
router.post('/getObject', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.NVarChar, req.body.type)
      .input('ID', sql.NVarChar, req.body.ID)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('signOff_GetObject')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
