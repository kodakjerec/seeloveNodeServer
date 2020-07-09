const express = require('express')
const router = express.Router()
const { sql, poolPromise } = require('./modules/config')

router.post('/companiesShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_CompaniesShow')

    res.json({ 
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
      .input('Status', sql.Varchar, form.Status)
      .input('Country', sql.Varchar, form.Country)
      .input('City', sql.Varchar, form.City)
      .input('Post', sql.Varchar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .execute('basic_CompanyNew')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('Status', sql.Varchar, form.Status)
      .input('Country', sql.Varchar, form.Country)
      .input('City', sql.Varchar, form.City)
      .input('Post', sql.Varchar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .execute('basic_CompanyEdit')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/customersShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_CustomersShow')

    res.json({ 
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
      .input('AgentCountry', sql.Varchar, form.AgentCountry)
      .input('AgentCity', sql.Varchar, form.AgentCity)
      .input('AgentPost', sql.Varchar, form.AgentPost)
      .input('AgentAddress', sql.NVarChar, form.AgentAddress)     
      .input('TelHome', sql.NVarChar, form.TelHome)
      .input('TelMobile', sql.NVarChar, form.TelMobile)
      .input('Country', sql.Varchar, form.Country)
      .input('City', sql.Varchar, form.City)
      .input('Post', sql.Varchar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('EmployeeID', sql.NVarChar, form.EmployeeID)
      .input('Birth', sql.NVarChar, form.Birth)
      .input('Gender', sql.Varchar, form.Gender)
      .input('Status', sql.Varchar, form.Status)
      .input('refKind', sql.NVarChar, form.refKind)
      .input('Referrer', sql.NVarChar, form.Referrer)
      .input('BusinessID', sql.NVarChar, form.BusinessID)
      .execute('basic_CustomerNew')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('AgentCountry', sql.Varchar, form.AgentCountry)
      .input('AgentCity', sql.Varchar, form.AgentCity)
      .input('AgentPost', sql.Varchar, form.AgentPost)
      .input('AgentAddress', sql.NVarChar, form.AgentAddress)     
      .input('TelHome', sql.NVarChar, form.TelHome)
      .input('TelMobile', sql.NVarChar, form.TelMobile)
      .input('Country', sql.Varchar, form.Country)
      .input('City', sql.Varchar, form.City)
      .input('Post', sql.Varchar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('EmployeeID', sql.NVarChar, form.EmployeeID)
      .input('Birth', sql.NVarChar, form.Birth)
      .input('Gender', sql.Varchar, form.Gender)
      .input('Status', sql.Varchar, form.Status)
      .input('refKind', sql.Varchar, form.refKind)
      .input('Referrer', sql.NVarChar, form.Referrer)
      .input('BusinessID', sql.NVarChar, form.BusinessID)
      .execute('basic_CustomerEdit')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/employeesShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_EmployeesShow')
      
    res.json({ 
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
      .input('Grade', sql.Varchar, form.Grade)
      .input('CompanyID', sql.NVarChar, form.CompanyID)
      .input('StartDate', sql.NVarChar, form.StartDate)
      .input('EndDate', sql.NVarChar, form.EndDate)
      .input('Status', sql.Varchar, form.Status)
      .input('Country', sql.Varchar, form.Country)
      .input('City', sql.Varchar, form.City)
      .input('Post', sql.Varchar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('ParentID', sql.NVarChar, form.ParentID)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('basic_EmployeeNew')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('Grade', sql.Varchar, form.Grade)
      .input('CompanyID', sql.NVarChar, form.CompanyID)
      .input('StartDate', sql.NVarChar, form.StartDate)
      .input('EndDate', sql.NVarChar, form.EndDate)
      .input('Status', sql.NVarChar, form.Status)
      .input('Country', sql.Varchar, form.Country)
      .input('City', sql.Varchar, form.City)
      .input('Post', sql.Varchar, form.Post)
      .input('Address', sql.NVarChar, form.Address)
      .input('EMail', sql.NVarChar, form.EMail)
      .input('ParentID', sql.NVarChar, form.ParentID)
      .input('Memo', sql.NVarChar, form.Memo)
      .execute('basic_EmployeeEdit')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/productsShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_ProductsShow')
      
    res.json({ 
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
      .input('AccountingName', sql.NVarChar, form.AccountingName)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('Unit', sql.Varchar, form.Unit)
      .input('Price', sql.Decimal, form.Price)
      .input('Cost', sql.Decimal, form.Cost)
      .execute('basic_ProductNew')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .input('AccountingName', sql.NVarChar, form.AccountingName)
      .input('Qty', sql.SmallInt, form.Qty)
      .input('Unit', sql.Varchar, form.Unit)
      .input('Price', sql.Decimal, form.Price)
      .input('Cost', sql.Decimal, form.Cost)
      .execute('basic_ProductEdit')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/productBOMNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProductID', sql.NVarChar, form.ProductID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('SubID', sql.NVarChar, form.SubID)
      .input('Qty', sql.SmallInt, form.Qty)
      .execute('basic_ProductBOMNew')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .execute('basic_ProductBOMEdit')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/projectsShow', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('basic_ProjectsShow')

    res.json({ 
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
      .execute('basic_ProjectNew')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .execute('basic_ProjectEdit')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
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
      .execute('basic_ProjectDetailNew')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
      .execute('basic_ProjectDetailEdit')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/projectPBonusNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ProjectID', sql.NVarChar, form.ProjectID)
      .input('Seq', sql.NVarChar, form.Seq)
      .input('Grade', sql.Varchar, form.Grade)
      .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectPBonusNew')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
           
    res.json({ 
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
    .input('Grade', sql.Varchar, form.Grade)
    .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectPBonusEdit')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
    .input('Grade', sql.Varchar, form.Grade)
    .input('Percentage', sql.Decimal(10,2), form.Percentage)
      .execute('basic_ProjectPBonusDelete')

      if (queryResult.recordset[0].code !== 200 ){
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
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
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
          
    res.json({ 
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
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
      }
      
    res.json({ 
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
        res.status(queryResult.recordset[0].code)
        res.send(queryResult.recordset[0].message)
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
      .execute('basic_GetDropdownList')
      
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
      .execute('basic_GetObject')
      
    res.json({
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router