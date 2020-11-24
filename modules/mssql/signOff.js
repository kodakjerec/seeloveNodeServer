const express = require('express')

const router = express.Router()
const { sql, poolPromise, successResponse } = require('./modules/config')

router.post('/assign', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, req.body.OrderID)
      .input('Type', sql.VarChar, req.body.Type)
      .input('Prefix', sql.VarChar, req.body.Prefix)
      .input('Status', sql.VarChar, req.body.Status)
      .input('ID', sql.VarChar, req.body.ID)
      .input('SignResult', sql.TinyInt, req.body.SignResult)
      .input('Memo', sql.NVarChar, req.body.Memo)
      .execute('signOff_Assign')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
