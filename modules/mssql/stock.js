const express = require('express')

const router = express.Router()
const { sql, poolPromise, successResponse } = require('./modules/config')

// inbound
router.post('/inboundOrderShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('ID', sql.VarChar, req.body.ID)
      .execute('stock_inboundOrderShow')

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/inboundOrderUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('OrderDate', sql.Date, form.OrderDate)
      .input('Status', sql.VarChar, form.Status)
      .input('CreateID', sql.VarChar, form.CreateID)
      .input('Amount', sql.Decimal, form.Amount)
      .input('Prefix', sql.VarChar, form.Prefix)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('Supplier', sql.VarChar, form.Supplier)
      .execute('stock_inboundOrderUpdate')

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
router.post('/inboundOrderDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ID', sql.NVarChar, form.ID)
    .input('OrderDate', sql.Date, form.OrderDate)
    .input('Status', sql.VarChar, form.Status)
    .input('CreateID', sql.VarChar, form.CreateID)
    .input('Amount', sql.Decimal, form.Amount)
    .input('Prefix', sql.VarChar, form.Prefix)
    .input('Memo', sql.NVarChar, form.Memo)
    .input('Supplier', sql.VarChar, form.Supplier)
      .execute('stock_inboundOrderDelete')

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

// inbound Order Detail
router.post('/inboundOrderDetailUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.TinyInt, form.Seq)
      .input('ProductID', sql.VarChar, form.ProductID)
      .input('Name', sql.NVarChar, form.Name)
      .input('Qty', sql.Int, form.Qty)
      .input('Cost', sql.Decimal, form.Cost)
      .input('StorageID', sql.VarChar, form.StorageID)
      .execute('stock_inboundOrderDetailUpdate')

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
router.post('/inboundOrderDetailDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('OrderID', sql.VarChar, form.OrderID)
    .input('Seq', sql.TinyInt, form.Seq)
    .input('ProductID', sql.VarChar, form.ProductID)
    .input('Name', sql.NVarChar, form.Name)
    .input('Qty', sql.Int, form.Qty)
    .input('Cost', sql.Decimal, form.Cost)
    .input('StorageID', sql.VarChar, form.StorageID)
      .execute('stock_inboundOrderDetailDelete')

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

// Stock Now
router.post('/stockNowShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('ID', sql.VarChar, req.body.ID)
      .execute('stock_StockNowShow')

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Transport Order

// Transport Order Detail

router.post('/getObject', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.NVarChar, req.body.type)
      .input('ID', sql.NVarChar, req.body.ID)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('stock_GetObject')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
