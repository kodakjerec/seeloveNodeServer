const express = require('express')
const router = express.Router()
const multer = require('multer')
const exceljs = require('exceljs')
const fs =require('fs')
const path = require('path')
const { loginUser, sql, poolPromise, errorResponse, successResponse } = require('./modules/config')

// Company
router.post('/companiesShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_CompaniesShow')

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/companyNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('Principal', sql.NVarChar, form.Principal)
      .input('UniformNumber', sql.NVarChar, form.UniformNumber)
      .input('Tel1', sql.NVarChar, form.Tel1)
      .input('Tel2', sql.NVarChar, form.Tel2)
      .input('StartDate', sql.NVarChar, form.StartDate)
      .input('EndDate', sql.NVarChar, form.EndDate)
      .input('Status', sql.VarChar, form.Status)
      .input('Country', sql.VarChar, form.Country)
      .input('City', sql.VarChar, form.City)
      .input('Post', sql.VarChar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('refKind', sql.VarChar, form.refKind)
      .input('Referrer', sql.NVarChar, form.Referrer)
      .input('EmployeeID', sql.NVarChar, form.EmployeeID)
      .input('Nickname', sql.NVarChar, form.Nickname)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('basic_CompanyNew')

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
router.post('/companyEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('Principal', sql.NVarChar, form.Principal)
      .input('UniformNumber', sql.NVarChar, form.UniformNumber)
      .input('Tel1', sql.NVarChar, form.Tel1)
      .input('Tel2', sql.NVarChar, form.Tel2)
      .input('StartDate', sql.NVarChar, form.StartDate)
      .input('EndDate', sql.NVarChar, form.EndDate)
      .input('Status', sql.VarChar, form.Status)
      .input('Country', sql.VarChar, form.Country)
      .input('City', sql.VarChar, form.City)
      .input('Post', sql.VarChar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('refKind', sql.VarChar, form.refKind)
      .input('Referrer', sql.NVarChar, form.Referrer)
      .input('EmployeeID', sql.NVarChar, form.EmployeeID)
      .input('Nickname', sql.NVarChar, form.Nickname)
      .input('userID', sql.VarChar, loginUser.userID)
      .execute('basic_CompanyEdit')

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
router.post('/companyDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .execute('basic_CompanyDelete')

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

// Customer
router.post('/customersShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_CustomersShow')
    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/customerNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('NameEnglish', sql.NVarChar, form.NameEnglish)
      .input('AgentID', sql.NVarChar, form.AgentID)
      .input('AgentName', sql.NVarChar, form.AgentName)
      .input('AgentCountry', sql.VarChar, form.AgentCountry)
      .input('AgentCity', sql.VarChar, form.AgentCity)
      .input('AgentPost', sql.VarChar, form.AgentPost)
      .input('AgentAddress', sql.NVarChar, form.AgentAddress)     
      .input('TelHome', sql.NVarChar, form.TelHome)
      .input('TelMobile', sql.NVarChar, form.TelMobile)
      .input('Country', sql.VarChar, form.Country)
      .input('City', sql.VarChar, form.City)
      .input('Post', sql.VarChar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('Birth', sql.Date, form.Birth)
      .input('Gender', sql.VarChar, form.Gender)
      .input('Status', sql.VarChar, form.Status)
      .input('refKind', sql.NVarChar, form.refKind)
      .input('Referrer', sql.NVarChar, form.Referrer)
      .input('userID', sql.VarChar, loginUser.userID)
      .input('BirthLunarDate', sql.Date, form.BirthLunarDate)
      .input('BirthLunarTime', sql.NVarChar, form.BirthLunarTime)
      .input('BirthLunarLeap', sql.TinyInt, form.BirthLunarLeap)
      .execute('basic_CustomerNew')

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
router.post('/customerEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('NameEnglish', sql.NVarChar, form.NameEnglish)
      .input('AgentID', sql.NVarChar, form.AgentID)
      .input('AgentName', sql.NVarChar, form.AgentName)
      .input('AgentCountry', sql.VarChar, form.AgentCountry)
      .input('AgentCity', sql.VarChar, form.AgentCity)
      .input('AgentPost', sql.VarChar, form.AgentPost)
      .input('AgentAddress', sql.NVarChar, form.AgentAddress)     
      .input('TelHome', sql.NVarChar, form.TelHome)
      .input('TelMobile', sql.NVarChar, form.TelMobile)
      .input('Country', sql.VarChar, form.Country)
      .input('City', sql.VarChar, form.City)
      .input('Post', sql.VarChar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('Birth', sql.Date, form.Birth)
      .input('Gender', sql.VarChar, form.Gender)
      .input('Status', sql.VarChar, form.Status)
      .input('refKind', sql.VarChar, form.refKind)
      .input('Referrer', sql.NVarChar, form.Referrer)
      .input('userID', sql.VarChar, loginUser.userID)
      .input('BirthLunarDate', sql.Date, form.BirthLunarDate)
      .input('BirthLunarTime', sql.NVarChar, form.BirthLunarTime)
      .input('BirthLunarLeap', sql.TinyInt, form.BirthLunarLeap)
      .execute('basic_CustomerEdit')

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
router.post('/customerDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .execute('basic_CustomerDelete')

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
router.post('/customerSearch', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, form.keyword)
      .input('Gender', sql.VarChar, form.Gender)
      .input('BirthStart', sql.VarChar, form.BirthStart)
      .input('BirthEnd', sql.VarChar, form.BirthEnd)
      .input('BirthLunarStart', sql.VarChar, form.BirthLunarStart)
      .input('BirthLunarEnd', sql.VarChar, form.BirthLunarEnd)
      .input('LunarTime', sql.VarChar, form.LunarTime)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_CustomerSearch')
      
    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

// Employee
router.post('/employeesShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_EmployeesShow')
      
    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/employeeNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('TelHome', sql.NVarChar, form.TelHome)
      .input('TelMobile', sql.NVarChar, form.TelMobile)
      .input('Grade', sql.VarChar, form.Grade)
      .input('CompanyID', sql.NVarChar, form.CompanyID)
      .input('StartDate', sql.NVarChar, form.StartDate)
      .input('EndDate', sql.NVarChar, form.EndDate)
      .input('Status', sql.VarChar, form.Status)
      .input('Country', sql.VarChar, form.Country)
      .input('City', sql.VarChar, form.City)
      .input('Post', sql.VarChar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('ParentID', sql.NVarChar, form.ParentID)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('basic_EmployeeNew')

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
router.post('/employeeEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('TelHome', sql.NVarChar, form.TelHome)
      .input('TelMobile', sql.NVarChar, form.TelMobile)
      .input('Grade', sql.VarChar, form.Grade)
      .input('CompanyID', sql.NVarChar, form.CompanyID)
      .input('StartDate', sql.NVarChar, form.StartDate)
      .input('EndDate', sql.NVarChar, form.EndDate)
      .input('Status', sql.NVarChar, form.Status)
      .input('Country', sql.VarChar, form.Country)
      .input('City', sql.VarChar, form.City)
      .input('Post', sql.VarChar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('ParentID', sql.NVarChar, form.ParentID)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('basic_EmployeeEdit')

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
router.post('/employeeDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .execute('basic_EmployeeDelete')

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

// Product
router.post('/productsShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('searchContent', sql.NVarChar, req.body.searchContent)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_ProductsShow')
      
    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/productNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('AccountingID', sql.NVarChar, form.AccountingID)
      .input('InvoiceName', sql.NVarChar, form.InvoiceName)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('Unit', sql.VarChar, form.Unit)
      .input('Price', sql.Decimal, form.Price)
      .input('Cost', sql.Decimal, form.Cost)
      .input('Category1', sql.VarChar, form.Category1)
      .input('Category2', sql.VarChar, form.Category2)
      .input('Category3', sql.VarChar, form.Category3)
      .input('Status', sql.VarChar, form.Status)
      .input('Inventory', sql.TinyInt, form.Inventory)
      .execute('basic_ProductNew')

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
router.post('/productEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('AccountingID', sql.NVarChar, form.AccountingID)
      .input('InvoiceName', sql.NVarChar, form.InvoiceName)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('Unit', sql.VarChar, form.Unit)
      .input('Price', sql.Decimal, form.Price)
      .input('Cost', sql.Decimal, form.Cost)
      .input('Category1', sql.VarChar, form.Category1)
      .input('Category2', sql.VarChar, form.Category2)
      .input('Category3', sql.VarChar, form.Category3)
      .input('Status', sql.VarChar, form.Status)
      .input('Inventory', sql.TinyInt, form.Inventory)
      .execute('basic_ProductEdit')

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
router.post('/productDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .execute('basic_ProductDelete')

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

// Product BOM
router.post('/productBOMNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProductID', sql.NVarChar, form.ProductID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('SubID', sql.NVarChar, form.SubID)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('Price', sql.Decimal, form.Price)
      .execute('basic_ProductBOMNew')

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
router.post('/productBOMEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProductID', sql.NVarChar, form.ProductID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('SubID', sql.NVarChar, form.SubID)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('Price', sql.Decimal, form.Price)
      .execute('basic_ProductBOMEdit')

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
router.post('/productBOMDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProductID', sql.NVarChar, form.ProductID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('SubID', sql.NVarChar, form.SubID)
      .input('Qty', sql.SmallInt, form.Qty)
      .execute('basic_ProductBOMDelete')

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

// Project
router.post('/projectsShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_ProjectsShow')

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/projectNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('StartDate', sql.Date, form.StartDate)
      .input('EndDate', sql.Date, form.EndDate)
      .input('Price', sql.Decimal, form.Price)
      .input('PV', sql.Decimal, form.PV)
      .input('Prefix', sql.VarChar, form.Prefix)
      .execute('basic_ProjectNew')

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
router.post('/projectEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .input('Name', sql.NVarChar, form.Name)
      .input('StartDate', sql.Date, form.StartDate)
      .input('EndDate', sql.Date, form.EndDate)
      .input('Price', sql.Decimal, form.Price)
      .input('PV', sql.Decimal, form.PV)
      .execute('basic_ProjectEdit')

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
router.post('/projectDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.NVarChar, form.ID)
      .execute('basic_ProjectDelete')

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

// Project Detail
router.post('/projectDetailNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProjectID', sql.NVarChar, form.ProjectID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('ProductID', sql.NVarChar, form.ProductID)
      .input('Price', sql.Decimal, form.Price)     
      .input('Qty', sql.SmallInt, form.Qty)
      .input('FromStorageID', sql.VarChar, form.FromStorageID)
      .input('ToStorageID', sql.VarChar, form.ToStorageID)
      .input('Purpose', sql.VarChar, form.Purpose)
      .execute('basic_ProjectDetailNew')

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
router.post('/projectDetailEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProjectID', sql.NVarChar, form.ProjectID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('ProductID', sql.NVarChar, form.ProductID)
      .input('Price', sql.Decimal, form.Price)     
      .input('Qty', sql.SmallInt, form.Qty)
      .input('FromStorageID', sql.VarChar, form.FromStorageID)
      .input('ToStorageID', sql.VarChar, form.ToStorageID)
      .input('Purpose', sql.VarChar, form.Purpose)
      .execute('basic_ProjectDetailEdit')

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
router.post('/projectDetailDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProjectID', sql.NVarChar, form.ProjectID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('ProductID', sql.NVarChar, form.ProductID)
      .input('Price', sql.Decimal, form.Price)     
      .input('Qty', sql.SmallInt, form.Qty)
      .execute('basic_ProjectDetailDelete')

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

// Project Performance Bonus
router.post('/projectPBonusNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProjectID', sql.NVarChar, form.ProjectID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('Grade', sql.VarChar, form.Grade)
      .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectPBonusNew')

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
router.post('/projectPBonusEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ProjectID', sql.NVarChar, form.ProjectID)
    .input('Seq', sql.NVarChar, form.Seq)
    .input('Grade', sql.VarChar, form.Grade)
    .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectPBonusEdit')

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
router.post('/projectPBonusDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ProjectID', sql.NVarChar, form.ProjectID)
    .input('Seq', sql.NVarChar, form.Seq)
    .input('Grade', sql.VarChar, form.Grade)
    .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectPBonusDelete')

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

// Project Super Bonus
router.post('/projectSuperBonusNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProjectID', sql.NVarChar, form.ProjectID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('Price', sql.Decimal, form.Price)
      .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectSuperBonusNew')

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
router.post('/projectSuperBonusEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ProjectID', sql.NVarChar, form.ProjectID)
    .input('Seq', sql.NVarChar, form.Seq)
    .input('Price', sql.Decimal, form.Price)
    .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectSuperBonusEdit')

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
router.post('/projectSuperBonusDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ProjectID', sql.NVarChar, form.ProjectID)
    .input('Seq', sql.NVarChar, form.Seq)
    .input('Price', sql.Decimal, form.Price)
    .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectSuperBonusDelete')

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

// Project Functions
router.post('/projectFunctionsUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProjectID', sql.NVarChar, form.ProjectID)
      .input('Function', sql.VarChar, form.Function)
      .input('Available', sql.TinyInt, form.Available)
      .input('Extend', sql.NVarChar, form.Extend)
      .execute('basic_ProjectFunctionsUpdate')

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

// Product Functions
router.post('/productFunctionsUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProductID', sql.NVarChar, form.ProductID)
      .input('Function', sql.VarChar, form.Function)
      .input('Available', sql.TinyInt, form.Available)
      .execute('basic_ProductFunctionsUpdate')

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

// StorageAddress
router.post('/storageAddressUpdate', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.VarChar, form.ID)
      .input('Building', sql.VarChar, form.Building)
      .input('Floor', sql.VarChar, form.Floor)
      .input('Area', sql.VarChar, form.Area)
      .input('Direction', sql.VarChar, form.Direction)
      .input('Category1', sql.VarChar, form.Category1)
      .input('Category2', sql.VarChar, form.Category2)
      .input('Category3', sql.VarChar, form.Category3)
      .input('Length', sql.Decimal, form.Length)
      .input('Width', sql.Decimal, form.Width)
      .input('Height', sql.Decimal, form.Height)
      .input('MaxQty', sql.Int, form.MaxQty)
      .input('AvgQty', sql.Int, form.AvgQty)
      .input('Status', sql.VarChar, form.Status)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('StorageType', sql.VarChar, form.StorageType)
      .execute('basic_StorageAddressUpdate')

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
router.post('/storageAddressBatchIns', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.VarChar, form.ID)
      .input('Building', sql.VarChar, form.Building)
      .input('Floor', sql.VarChar, form.Floor)
      .input('Area', sql.VarChar, form.Area)
      .input('Direction', sql.VarChar, form.Direction)
      .input('Category1', sql.VarChar, form.Category1)
      .input('Category2', sql.VarChar, form.Category2)
      .input('Category3', sql.VarChar, form.Category3)
      .input('Length', sql.Decimal, form.Length)
      .input('Width', sql.Decimal, form.Width)
      .input('Height', sql.Decimal, form.Height)
      .input('MaxQty', sql.Int, form.MaxQty)
      .input('AvgQty', sql.Int, form.AvgQty)
      .input('Status', sql.VarChar, form.Status)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('RowStart', sql.VarChar, form.RowStart)
      .input('ColumnStart', sql.TinyInt, form.ColumnStart)
      .input('ColumnEnd', sql.TinyInt, form.ColumnEnd)
      .input('LocationStart', sql.TinyInt, form.LocationStart)
      .input('LocationEnd', sql.TinyInt, form.LocationEnd)
      .input('StorageType', sql.VarChar, form.StorageType)
      .execute('basic_StorageAddressBatchIns')

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
router.post('/storageAddressDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.VarChar, form.ID)
      .execute('basic_StorageAddressDelete')

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
router.post('/storageAddressShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('searchContent', sql.NVarChar, req.body.searchContent)
      .input('pagination', sql.NVarChar, req.body.pagination)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_StorageAddressShow')

    successResponse(res, { 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.get('/storageAddressExportExcel', async (req, res) => {
  try {
    res.header('code', '200')
    res.download(path.join(__dirname, '../download', 'storageAddressExport.xlsx'))
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'modules/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })
router.post('/storageAddressUpload', upload.single('file') , async (req, res) => {
  try {
    let fromFile = req.file
    let successCount = 0
    let failCount = 0
    const pool = await poolPromise

    // 解析xlsx
    let workbook = new exceljs.Workbook()
    workbook = await workbook.xlsx.readFile(fromFile.path)
    // 只找第一個分頁
    let worksheet = workbook.getWorksheet(1)
    // 第一行是標題, 從第二行開始
    for (let i=2; i <= worksheet.rowCount; i++){
      let row = worksheet.getRow(i)
      let isUpdate = row.getCell(1).value

      if (isUpdate) {
        const queryResult = await pool.request()
        .input('ID', sql.VarChar, row.getCell(2).value)
        .input('Building', sql.VarChar, row.getCell(3).value)
        .input('Floor', sql.VarChar, row.getCell(4).value)
        .input('Area', sql.VarChar, row.getCell(5).value)
        .input('Direction', sql.VarChar, row.getCell(6).value)
        .input('Category1', sql.VarChar, row.getCell(7).value)
        .input('Category2', sql.VarChar, row.getCell(8).value)
        .input('Category3', sql.VarChar, row.getCell(9).value)
        .input('Length', sql.Decimal, row.getCell(10).value)
        .input('Width', sql.Decimal, row.getCell(11).value)
        .input('Height', sql.Decimal, row.getCell(12).value)
        .input('MaxQty', sql.Int, row.getCell(13).value)
        .input('AvgQty', sql.Int, row.getCell(14).value)
        .input('Status', sql.VarChar, '1')
        .input('Memo', sql.NVarChar, row.getCell(15).value)
        .input('StorageType', sql.VarChar, row.getCell(16).value)
        .execute('basic_StorageAddressUpdate')

        if (queryResult.recordset[0].code !== 200 ){
          failCount++
        } else {
          successCount++
        }
      } else {
        const queryResult = await pool.request()
        .input('ID', sql.VarChar, row.getCell(2).value)
        .execute('basic_StorageAddressDelete')

        if (queryResult.recordset[0].code !== 200 ){
          failCount++
        } else {
          successCount++
        }
      }
    }

    // 刪除檔案
    fs.unlink(fromFile.path, (err) => {
      if (err) {
        return
      }
    })
    successResponse(res,{
      result: {
        successCount: successCount,
        failCount: failCount
      }
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
      .input('type', sql.NVarChar, req.body.type)
      .input('ID', sql.VarChar, req.body.ID)
      .execute('basic_CheckValidate')
      
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
      .execute('basic_GetDropdownList')
      
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
      .input('keyword', sql.VarChar, req.body.keyword)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_GetObject')
      
    successResponse(res, {
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router