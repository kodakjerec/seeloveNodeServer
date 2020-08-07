const express = require('express')
const router = express.Router()
const { sql, poolPromise } = require('./modules/config')

router.post('/ordersShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_OrdersShow')

    res.json({ 
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
      .execute('orders_OrderNew')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .execute('orders_OrderEdit')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('Status', sql.VarChar, form.Status)
      .execute('orders_OrderDelete')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
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
      .execute('orders_OrderCustomerNew')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .execute('orders_OrderCustomerEdit')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
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
      .execute('orders_OrderDetailNew')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .execute('orders_OrderDetailEdit')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('Certificate1', sql.VarChar, form.Certificate1)
      .input('PrintCount', sql.TinyInt, form.PrintCount)
      .input('Status', sql.VarChar, form.Status)
      .input('CreateDate', sql.Date, form.CreateDate)
      .execute('orders_OrderCertificate1New')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('Certificate2', sql.VarChar, form.Certificate2)
      .input('PrintCount', sql.TinyInt, form.PrintCount)
      .input('Status', sql.VarChar, form.Status)
      .input('CreateDate', sql.Date, form.CreateDate)
      .execute('orders_OrderCertificate2New')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('PrintCount', sql.TinyInt, form.PrintCount)
      .input('Status', sql.VarChar, form.Status)
      .input('CreateDate', sql.Date, form.CreateDate)
      .execute('orders_OrderCertificate1Edit')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('PrintCount', sql.TinyInt, form.PrintCount)
      .input('Status', sql.VarChar, form.Status)
      .input('CreateDate', sql.Date, form.CreateDate)
      .execute('orders_OrderCertificate2Edit')

      if (queryResult.recordset[0].code !== 200 ){
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
        throw Error(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
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
      .execute('orders_CollectionRecordsNew')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    res.json({ 
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
      .execute('orders_CollectionRecordsEdit')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    res.json({ 
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

    res.json({ 
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
      .input('type', sql.NVarChar, req.body.type)
      .input('OrderID', sql.NVarChar, req.body.OrderID)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_CollectionRecordsFunctions')
      
    res.json({
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/invoiceShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_InvoiceShow')

    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/invoiceHeadNew', async (req, res) => {
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
      .execute('orders_InvoiceHeadNew')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/invoiceHeadEdit', async (req, res) => {
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
      .execute('orders_InvoiceHeadEdit')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    res.json({ 
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
      .execute('orders_InvoiceHeadInvalid')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    res.json({ 
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
      .input('type', sql.NVarChar, req.body.type)
      .input('OrderID', sql.NVarChar, req.body.OrderID)
      .input('InvoiceID', sql.NVarChar, req.body.InvoiceID)
      .input('Seq', sql.NVarChar, req.body.Seq)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_InvoiceFunctions')
      
    res.json({
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/invoiceDetailNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('InvoiceID', sql.VarChar, form.InvoiceID)
      .input('InvoiceDate', sql.Date, form.InvoiceDate)
      .input('Seq', sql.TinyInt, form.Seq)
      .input('AccountingID', sql.VarChar, form.AccountingID)
      .input('AccountingName', sql.NVarChar, form.AccountingName)
      .input('Price', sql.Decimal, form.Price)
      .input('Qty', sql.Decimal, form.Qty)
      .input('Amount', sql.Decimal, form.Amount)
      .input('Tax', sql.Decimal, form.Tax)
      .input('AmountNoTax', sql.Decimal, form.AmountNoTax)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('orders_InvoiceDetailNew')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/invoiceDetailEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('InvoiceID', sql.VarChar, form.InvoiceID)
      .input('InvoiceDate', sql.Date, form.InvoiceDate)
      .input('Seq', sql.TinyInt, form.Seq)
      .input('AccountingID', sql.VarChar, form.AccountingID)
      .input('AccountingName', sql.NVarChar, form.AccountingName)
      .input('Price', sql.Decimal, form.Price)
      .input('Qty', sql.Decimal, form.Qty)
      .input('Amount', sql.Decimal, form.Amount)
      .input('Tax', sql.Decimal, form.Tax)
      .input('AmountNoTax', sql.Decimal, form.AmountNoTax)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('orders_InvoiceDetailEdit')

    if (queryResult.recordset[0].code !== 200 ){
      throw Error(queryResult.recordset[0].message)
    }

    res.json({ 
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
      .input('type', sql.NVarChar, req.body.type)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_GetDropdownList')
      
    res.json({
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
      .execute('orders_GetObject')
      
    res.json({
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
