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

module.exports = router
