const express = require('express')
const router = express.Router()
const { sql, poolPromise, successResponse } = require('./modules/config')

router.post('/employeesToExcel', async (req, res) => {
  try {
    successResponse(res, {})

  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/certificate1ToExcel', async (req, res) => {
  try {
    successResponse(res, {})

  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/certificate2ToExcel', async (req, res) => {
  try {
    successResponse(res, {})

  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/bonus1ToExcel', async (req, res) => {
  try {
    successResponse(res, {})
    
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/bonus2ToExcel', async (req, res) => {
  try {
    successResponse(res, {})
    
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/fKOrderPrint', async (req, res) => {
  try {
    successResponse(res, {})
    
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/fKOrderRpt', async (req, res) => {
  try {
    successResponse(res, {})
    
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/anzaReportTotal', async (req, res) => {
  try {
    successResponse(res, {})
    
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
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
module.exports = router