const express = require('express')
const router = express.Router()
const { sql, poolPromise, successResponse } = require('./modules/config')

router.post('/ssrsReports', async (req, res) => {
  try {
    successResponse(req, res, {})
    
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/getDropdownList', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.VarChar, req.body.type)
      .input('keyword', sql.VarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('reports_GetDropdownList')
      
    successResponse(req, res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
module.exports = router