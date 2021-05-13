const express = require('express')
const router = express.Router()
const { loginUser, sql, poolPromise, errorResponse, successResponse } = require('./modules/config')

// Order
router.post('/ordersShowGroup', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .execute('orders_OrdersShowGroup')

    successResponse(req, res, { 
      result: JSON.parse(queryResult.recordset[0].filterSettings)[0]
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/ordersShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('searchContent', sql.NVarChar, req.body.searchContent)
      .input('pagination', sql.NVarChar, req.body.pagination)
      .input('sortable', sql.NVarChar, req.body.sortable)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_OrdersShow')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('OrderDate', sql.Date, form.OrderDate)
      .input('ProjectID', sql.VarChar, form.ProjectID)
      .input('Status', sql.VarChar, form.Status)
      .input('CreateID', sql.VarChar, form.CreateID)
      .input('Price', sql.Decimal, form.Price)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('Amount', sql.Decimal, form.Amount)
      .input('Prefix', sql.VarChar, form.Prefix)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_OrderNew')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('OrderDate', sql.Date, form.OrderDate)
      .input('ProjectID', sql.VarChar, form.ProjectID)
      .input('Status', sql.VarChar, form.Status)
      .input('CreateID', sql.VarChar, form.CreateID)
      .input('Price', sql.Decimal, form.Price)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('Amount', sql.Decimal, form.Amount)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_OrderEdit')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .execute('orders_OrderDelete')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderInvalid', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_OrderInvalid')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Order Customer
router.post('/orderCustomerNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('CustomerID', sql.VarChar, form.CustomerID)     
      .input('TelHome', sql.NVarChar, form.TelHome)
      .input('TelMobile', sql.NVarChar, form.TelMobile)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('Country', sql.VarChar, form.Country)
      .input('City', sql.VarChar, form.City)
      .input('Post', sql.VarChar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('AgentID', sql.NVarChar, form.AgentID)
      .input('AgentName', sql.NVarChar, form.AgentName)
      .input('AgentCountry', sql.VarChar, form.AgentCountry)
      .input('AgentCity', sql.VarChar, form.AgentCity)
      .input('AgentPost', sql.VarChar, form.AgentPost)
      .input('AgentAddress', sql.NVarChar, form.AgentAddress)
      .input('refKind', sql.NVarChar, form.refKind)
      .input('Referrer', sql.NVarChar, form.Referrer)
      .input('EmployeeID', sql.NVarChar, form.EmployeeID)
      .input('ModifyType',sql.NVarChar, form.ModifyType)
      .input('CompanyID', sql.VarChar, form.CompanyID)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_OrderCustomerNew')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderCustomerEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('CustomerID', sql.VarChar, form.CustomerID)     
      .input('TelHome', sql.NVarChar, form.TelHome)
      .input('TelMobile', sql.NVarChar, form.TelMobile)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('Country', sql.VarChar, form.Country)
      .input('City', sql.VarChar, form.City)
      .input('Post', sql.VarChar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('AgentID', sql.NVarChar, form.AgentID)
      .input('AgentName', sql.NVarChar, form.AgentName)
      .input('AgentCountry', sql.VarChar, form.AgentCountry)
      .input('AgentCity', sql.VarChar, form.AgentCity)
      .input('AgentPost', sql.VarChar, form.AgentPost)
      .input('AgentAddress', sql.NVarChar, form.AgentAddress)
      .input('refKind', sql.NVarChar, form.refKind)
      .input('Referrer', sql.NVarChar, form.Referrer)
      .input('EmployeeID', sql.NVarChar, form.EmployeeID)
      .input('ModifyType',sql.NVarChar, form.ModifyType)
      .input('CompanyID', sql.VarChar, form.CompanyID)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_OrderCustomerEdit')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Order Detail
router.post('/orderDetailNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.TinyInt, form.Seq)     
      .input('ProjectID', sql.VarChar, form.ProjectID)
      .input('ProductID', sql.VarChar, form.ProductID)
      .input('Name', sql.NVarChar, form.Name)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('ItemType', sql.TinyInt, form.ItemType)
      .input('Price', sql.Decimal, form.Price)
      .input('FromStorageID', sql.VarChar, form.FromStorageID)
      .input('ToStorageID', sql.VarChar, form.ToStorageID)
      .input('Purpose', sql.VarChar, form.Purpose)
      .execute('orders_OrderDetailNew')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderDetailEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.TinyInt, form.Seq)     
      .input('ProjectID', sql.VarChar, form.ProjectID)
      .input('ProductID', sql.VarChar, form.ProductID)
      .input('Name', sql.NVarChar, form.Name)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('ItemType', sql.TinyInt, form.ItemType)
      .input('Price', sql.Decimal, form.Price)
      .input('FromStorageID', sql.VarChar, form.FromStorageID)
      .input('ToStorageID', sql.VarChar, form.ToStorageID)
      .input('Purpose', sql.VarChar, form.Purpose)
      .execute('orders_OrderDetailEdit')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderDetailDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.TinyInt, form.Seq)     
      .execute('orders_OrderDetailDelete')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Certificate1
router.post('/certificate1Show', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_Certificate1Show')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderCertificate1New', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('ReportDuration', sql.VarChar, form.ReportDuration)
      .input('Prefix', sql.VarChar, form.Prefix)
      .input('IssuanceDate', sql.Date, form.IssuanceDate)
      .execute('orders_OrderCertificate1New')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderCertificate1Edit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Certificate1', sql.VarChar, form.Certificate1)
      .input('Status', sql.VarChar, form.Status)
      .input('ReportDuration', sql.VarChar, form.ReportDuration)
      .input('IssuanceDate', sql.Date, form.IssuanceDate)
      .execute('orders_OrderCertificate1Edit')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderCertificate1Delete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Certificate1', sql.VarChar, form.Certificate1)
      .execute('orders_OrderCertificate1Delete')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Certificate2
router.post('/certificate2Show', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_Certificate2Show')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderCertificate2New', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('IssuanceDate', sql.Date, form.IssuanceDate)
      .execute('orders_OrderCertificate2New')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderCertificate2Edit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Certificate2', sql.VarChar, form.Certificate2)
      .input('Status', sql.VarChar, form.Status)
      .input('IssuanceDate', sql.Date, form.IssuanceDate)
      .execute('orders_OrderCertificate2Edit')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderCertificate2Delete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Certificate2', sql.VarChar, form.Certificate2)
      .execute('orders_OrderCertificate2Delete')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Collection Records
router.post('/collectionRecordsNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.TinyInt, form.Seq)
      .input('InvoiceID', sql.VarChar, form.InvoiceID)
      .input('PaymentMethod', sql.VarChar, form.PaymentMethod)
      .input('ReceivedDate', sql.Date, form.ReceivedDate)
      .input('Amount', sql.Decimal, form.Amount)
      .input('Account', sql.VarChar, form.Account)
      .input('BankID', sql.VarChar, form.BankID)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('ReceivedID', sql.VarChar, form.ReceivedID)
      .input('ChequeDate', sql.Date, form.ChequeDate)
      .input('InvoiceName', sql.NVarChar, form.InvoiceName)
      .execute('orders_CollectionRecordsNew')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/collectionRecordsEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.TinyInt, form.Seq)
      .input('InvoiceID', sql.VarChar, form.InvoiceID)
      .input('PaymentMethod', sql.VarChar, form.PaymentMethod)
      .input('ReceivedDate', sql.Date, form.ReceivedDate)
      .input('Amount', sql.Decimal, form.Amount)
      .input('Account', sql.VarChar, form.Account)
      .input('BankID', sql.VarChar, form.BankID)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('ReceivedID', sql.VarChar, form.ReceivedID)
      .input('ChequeDate', sql.Date, form.ChequeDate)
      .input('InvoiceName', sql.NVarChar, form.InvoiceName)
      .execute('orders_CollectionRecordsEdit')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/collectionRecordsDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.TinyInt, form.Seq)
      .execute('orders_CollectionRecordsDelete')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/collectionRecordsFunctions', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.VarChar, req.body.type)
      .input('OrderID', sql.VarChar, req.body.OrderID)
      .input('Seq', sql.TinyInt, req.body.Seq)
      .input('BindSeq', sql.NVarChar, req.body.BindSeq)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_CollectionRecordsFunctions')
      
    successResponse(req, res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Invoice
router.post('/invoiceShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_InvoiceShow')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/invoiceHeadUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('InvoiceID', sql.VarChar, form.InvoiceID)
      .input('InvoiceDate', sql.Date, form.InvoiceDate)
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Title', sql.NVarChar, form.Title)
      .input('UniformNumber', sql.VarChar, form.UniformNumber)
      .input('Amount', sql.Decimal, form.Amount)
      .input('ReceivedDate', sql.Date, form.ReceivedDate)
      .input('InvoiceKind', sql.VarChar, form.InvoiceKind)
      .input('Tax', sql.Decimal, form.Tax)
      .input('CarrierNumber', sql.VarChar, form.CarrierNumber)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('InvoiceIDFirst', sql.VarChar, form.InvoiceIDFirst)
      .input('RandomCode', sql.VarChar, form.RandomCode)
      .input('CreateID', sql.VarChar, form.CreateID)
      .input('Status', sql.VarChar, form.Status)
      .input('SalesReturnDate', sql.Date, form.SalesReturnDate)
      .execute('orders_InvoiceHeadUpdate')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/invoiceHeadInvalid', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('InvoiceID', sql.VarChar, form.InvoiceID)
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('SalesReturnDate', sql.Date, form.SalesReturnDate)
      .execute('orders_InvoiceHeadInvalid')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/invoiceHeadDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('InvoiceID', sql.VarChar, form.InvoiceID)
      .input('OrderID', sql.VarChar, form.OrderID)
      .execute('orders_InvoiceHeadDelete')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/invoiceFunctions', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.VarChar, req.body.type)
      .input('OrderID', sql.VarChar, req.body.OrderID)
      .input('InvoiceID', sql.VarChar, req.body.InvoiceID)
      .input('Seq', sql.VarChar, req.body.Seq)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_InvoiceFunctions')
      
    successResponse(req, res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Invoice Detail
router.post('/invoiceDetailUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('InvoiceID', sql.VarChar, form.InvoiceID)
      .input('Seq', sql.TinyInt, form.Seq)
      .input('InvoiceName', sql.NVarChar, form.InvoiceName)
      .input('Price', sql.Decimal, form.Price)
      .input('Qty', sql.Decimal, form.Qty)
      .input('Amount', sql.Decimal, form.Amount)
      .input('Tax', sql.Decimal, form.Tax)
      .execute('orders_InvoiceDetailUpdate')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Order Functions
router.post('/orderFunctionsUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Function', sql.VarChar, form.Function)
      .input('Value', sql.VarChar, form.Value)     
      .execute('orders_OrderFunctionsUpdate')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Order Detail Functions
router.post('/orderDetailFunctionsUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('DetailSeq', sql.TinyInt, form.DetailSeq)   
      .input('Function', sql.VarChar, form.Function)
      .input('Seq', sql.TinyInt, form.Seq)
      .input('Value1', sql.VarChar, form.Value1)
      .input('Value2', sql.VarChar, form.Value2)
      .input('Value3', sql.VarChar, form.Value3)
      .input('Value4', sql.VarChar, form.Value4)
      .execute('orders_OrderDetailFunctionsUpdate')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/orderDetailFunctionsDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('DetailSeq', sql.TinyInt, form.DetailSeq)  
      .input('Function', sql.VarChar, form.Function)
      .input('Seq', sql.TinyInt, form.Seq)
      .execute('orders_OrderDetailFunctionsDelete')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// fK Order
// fKOrder
router.post('/fKOrdersShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('searchContent', sql.NVarChar, req.body.searchContent)
      .input('pagination', sql.NVarChar, req.body.pagination)
      .input('sortable', sql.NVarChar, req.body.sortable)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_FKOrdersShow')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})


// Anza Order
router.post('/anzaShowGroup', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .execute('orders_AnzaShowGroup')

    successResponse(req, res, { 
      result: JSON.parse(queryResult.recordset[0].filterSettings)[0]
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/anzaAlarm', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_AnzaAlarm')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/anzaOrderShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.VarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_AnzaOrderShow')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/anzaOperate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.VarChar, form.type)
      .input('AnzaOrderID', sql.VarChar, form.AnzaOrderID)
      .input('CustomerID', sql.VarChar, form.CustomerID)
      .input('StorageID', sql.VarChar, form.StorageID)
      .input('RealDate', sql.Date, form.RealDate)
      .input('CompleteDate', sql.Date, form.CompleteDate)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_AnzaOperate')

    if (queryResult.recordset[0].code !== 200 ){
      errorResponse(res, queryResult.recordset[0])
      return
    }

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/anzaOrderUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('AnzaOrderID', sql.VarChar, form.AnzaOrderID)
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('CustomerID', sql.VarChar, form.CustomerID)  
      .input('ScheduledDate', sql.Date, form.ScheduledDate)
      .input('ExpirationDate', sql.Date, form.ExpirationDate)
      .input('ModifyType', sql.NVarChar, form.ModifyType)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_AnzaOrderUpdate')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/anzaOrderShow2', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('searchContent', sql.NVarChar, req.body.searchContent)
      .input('pagination', sql.NVarChar, req.body.pagination)
      .input('sortable', sql.NVarChar, req.body.sortable)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('orders_AnzaOrderShow2')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Order Installment
router.post('/installmentDetailUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.SmallInt, form.Seq) 
      .input('InstallmentName', sql.NVarChar, form.InstallmentName)
      .input('ScheduledDate', sql.Date, form.ScheduledDate)
      .input('ScheduledAmount', sql.Decimal, form.ScheduledAmount)  
      .input('PaymentMethod', sql.VarChar, form.PaymentMethod)
      .input('PaymentFrequency', sql.VarChar, form.PaymentFrequency)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('orders_InstallmentDetailUpdate')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/installmentDetailDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('OrderID', sql.VarChar, form.OrderID)
      .input('Seq', sql.SmallInt, form.Seq)
      .execute('orders_InstallmentDetailDelete')

      if (queryResult.recordset[0].code !== 200 ){
        errorResponse(res, queryResult.recordset[0])
        return
      }
      
    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/installmentAlarm', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('userID', sql.VarChar, loginUser.userID)
      .input('StartDate', sql.Date, req.body.StartDate)
      .execute('orders_InstallmentAlarm')

    successResponse(req, res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Others
router.post('/getDropdownList', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.VarChar, req.body.type)
      .input('keyword', sql.VarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_GetDropdownList')
      
    successResponse(req, res, {
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
      .execute('orders_GetObject')
      
    successResponse(req, res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
