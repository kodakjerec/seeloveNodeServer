const express = require('express')

const router = express.Router()
const { loginUser, sql, poolPromise, successResponse } = require('./modules/config')

// inbound
router.post('/inboundOrderShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
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
      .input('searchContent', sql.NVarChar, req.body.searchContent)
      .input('pagination', sql.NVarChar, req.body.pagination)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('stock_StockNowShow')

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/findStorageID', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProductID', sql.VarChar, req.body.ProductID)
      .input('Purpose', sql.VarChar, req.body.Purpose)
      .input('Qty', sql.Int, req.body.Qty)
      .input('StorageID', sql.VarChar, req.body.StorageID)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('stock_FindStorageID')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/checkValidate', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ProductID', sql.VarChar, req.body.ProductID)
    .input('Purpose', sql.VarChar, req.body.Purpose)
    .input('Qty', sql.Int, req.body.Qty)
    .input('StorageID', sql.VarChar, req.body.StorageID)
    .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('stock_CheckValidate')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/mapGet', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('Building', sql.VarChar, req.body.Building)
    .input('Floor', sql.VarChar, req.body.Floor)
    .input('Area', sql.VarChar, req.body.Area)
    .input('Column', sql.VarChar, req.body.Column)
    .input('Row', sql.VarChar, req.body.Row)
    .input('Grid', sql.VarChar, req.body.Grid)
    .input('StorageID', sql.VarChar, req.body.StorageID)
    .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('stock_MapGet')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/mapGetImage', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('Building', sql.VarChar, req.body.Building)
    .input('Floor', sql.VarChar, req.body.Floor)
    .input('Area', sql.VarChar, req.body.Area)
    .input('Column', sql.VarChar, req.body.Column)
    .input('Row', sql.VarChar, req.body.Row)
    .input('Grid', sql.VarChar, req.body.Grid)
    .input('StorageID', sql.VarChar, req.body.StorageID)
    .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('stock_MapGetImage')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/mapUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('Building', sql.VarChar, form.Building)
    .input('Floor', sql.VarChar, form.Floor)
    .input('Area', sql.VarChar, form.Area)
    .input('StorageID', sql.VarChar, form.StorageID)
    .input('xAxis', sql.Float, form.xAxis)
    .input('yAxis', sql.Float, form.yAxis)
    .input('Length', sql.Decimal, form.Length)
    .input('Width', sql.Decimal, form.Width)
    .execute('stock_MapUpdate')

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

// Transport Order
router.post('/transportOrderShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('stock_TransportOrderShow')

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/transportOrderUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('OrderDate', sql.Date, form.OrderDate)
      .input('Status', sql.VarChar, form.Status)
      .input('CreateID', sql.VarChar, form.CreateID)
      .input('Prefix', sql.VarChar, form.Prefix)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('stock_TransportOrderUpdate')

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
router.post('/transportOrderDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ID', sql.NVarChar, form.ID)
      .execute('stock_TransportOrderDelete')

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

// Transport Order Detail
router.post('/transportOrderDetailUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.TinyInt, form.Seq)
      .input('ProductID', sql.VarChar, form.ProductID)
      .input('Name', sql.NVarChar, form.Name)
      .input('Qty', sql.Int, form.Qty)
      .input('FromStorageID', sql.VarChar, form.FromStorageID)
      .input('ToStorageID', sql.VarChar, form.ToStorageID)
      .execute('stock_TransportOrderDetailUpdate')

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
router.post('/transportOrderDetailDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('OrderID', sql.VarChar, form.OrderID)
    .input('Seq', sql.TinyInt, form.Seq)
      .execute('stock_TransportOrderDetailDelete')

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

router.post('/getDropdownList', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.VarChar, req.body.type)
      .input('keyword', sql.VarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('stock_GetDropdownList')
      
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
      .input('type', sql.VarChar, req.body.type)
      .input('keyword', sql.VarChar, req.body.keyword)
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
