const express = require('express')
const router = express.Router()
const { sql, poolPromise } = require('./modules/config')
const Excel = require('exceljs')
const path = require('path')

router.post('/employees', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('CompanyID', sql.NVarChar, req.body.CompanyID)
      .execute('reports_Employees')

    res.json({
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/bonus1', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('StartDate', sql.Date, form.StartDate)
      .input('EndDate', sql.Date, form.EndDate)
      .execute('reports_Bonus1')
      
    res.json({
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.get('/employeesToExcel', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('CompanyID', sql.NVarChar, req.query.CompanyID)
      .execute('reports_Employees')

    let columns = [] 
    req.query.columns.forEach(column => {
      columns.push(JSON.parse(column))
    })
    let fileName = 'sample.xlsx'
    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet('MySheet')
    worksheet.columns = columns
    worksheet.addRows(queryResult.recordset)

    res.attachment(fileName)
    await workbook.xlsx.write(res)
    res.end()

  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.get('/certificate1ToExcel', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.query.Certificate1)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_Certificate1Show')
    let data = queryResult.recordset

    let fileName = 'sample.xlsx'
    let workbook = new Excel.Workbook()
    await workbook.xlsx.readFile( path.join(__dirname, '/xlsx/供奉憑證範例.xlsx'))

    let worksheet = workbook.getWorksheet(1)
    // 欄寬調整, 因為readFile會導致欄寬跑掉
    worksheet.getColumn(1).width = worksheet.getColumn(1).width*1.142
    worksheet.getColumn(2).width = worksheet.getColumn(2).width*1.142
    worksheet.getColumn(3).width = worksheet.getColumn(3).width*1.142
    worksheet.getColumn(4).width = worksheet.getColumn(4).width*1.142
    worksheet.getColumn(5).width = worksheet.getColumn(5).width*1.142
    worksheet.getColumn(6).width = worksheet.getColumn(6).width*1.142
    worksheet.getColumn(7).width = worksheet.getColumn(7).width*1.142
    worksheet.getColumn(8).width = worksheet.getColumn(8).width*1.142
    worksheet.getColumn(9).width = worksheet.getColumn(9).width*1.142

    // 填格子
    worksheet.getCell('B2').value = data[0].CustomerName
    worksheet.getCell('H3').value = data[0].OrderID
    worksheet.getCell('H4').value = data[0].Certificate1

    // 傳送
    res.attachment(fileName)
    await workbook.xlsx.write(res)
    res.end()

  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.get('/certificate2ToExcel', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('keyword', sql.NVarChar, req.query.Certificate2)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('orders_Certificate2Show')
    let data = queryResult.recordset

    let fileName = 'sample.xlsx'
    let workbook = new Excel.Workbook()
    await workbook.xlsx.readFile( path.join(__dirname, '/xlsx/換狀證明範例.xlsx'))

    let worksheet = workbook.getWorksheet(1)
    // 欄寬調整, 因為readFile會導致欄寬跑掉

    // 填格子
    worksheet.getCell('B2').value = data[0].Certificate2
    worksheet.getCell('B4').value = data[0].CreateDate
    worksheet.getCell('B4').numFmt ='yyyy"年"m"月"d"日"'
    worksheet.getCell('B6').value = data[0].CustomerName
    worksheet.getCell('B8').value = data[0].CustomerID

    // 傳送
    res.attachment(fileName)
    await workbook.xlsx.write(res)
    res.end()

  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.get('/bonus1ToExcel', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .input('StartDate', sql.Date, req.query.StartDate)
      .input('EndDate', sql.Date, req.query.EndDate)
      .execute('reports_Bonus1')
    console.log(req.query.StartDate)
    let columns = [] 
    req.query.columns.forEach(column => {
      columns.push(JSON.parse(column))
    })
    let fileName = 'sample.xlsx'
    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet('MySheet')
    worksheet.columns = columns
    worksheet.addRows(queryResult.recordset)

    res.attachment(fileName)
    await workbook.xlsx.write(res)
    res.end()
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
      .execute('reports_GetDropdownList')
      
    res.json({
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
module.exports = router