const express = require('express')
const multer = require('multer')
const exceljs = require('exceljs')
const fs =require('fs')
const router = express.Router()
const { loginUser, sql, poolPromise, successResponse } = require('./modules/config')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'modules/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

router.post('/ssrsReports', async (req, res) => {
  try {
    successResponse(res, {})
    
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

const upload = multer({ storage: storage })
router.post('/wintonInvoiceUpload', upload.single('file') , async (req, res) => {
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
    let invoiceID = ''
    let invoiceDetailSeq = 0
    // 第一行是標題, 從第二行開始
    for (let i=2; i <= worksheet.rowCount; i++){
      let row = worksheet.getRow(i)
      if (row.getCell(13).value !== invoiceID) {
        // 新發票ID 塞入invoiceHead
        invoiceID = row.getCell(13).value
        invoiceDetailSeq = 0

        // 組合發票日期
        let invoiceDate = (parseInt(row.getCell(39).value)+1911).toString()+'/'+row.getCell(40).value+'/'+row.getCell(41).value
        // 發票稅額方式
        let taxKind = '1'
        if (row.getCell(46).value === 'v') {
          taxKind = '1'
        }
        else if (row.getCell(47).value === 'v') {
          taxKind = '2'
        }
        else if (row.getCell(48).value === 'v') {
          taxKind = '3'
        }
        // 新增 or 作廢
        let deleteInvoice = false
        if (row.getCell(97).value !== 'N') {
          deleteInvoice = true
        }

        if (deleteInvoice === false){
          // 新增 發票表頭 InvoiceHead
          const queryResult = await pool.request()
            .input('InvoiceID', sql.VarChar, invoiceID)
            .input('InvoiceDate', sql.Date, invoiceDate)
            .input('OrderID', sql.VarChar, row.getCell(1).value)
            .input('Title', sql.NVarChar, row.getCell(11).value)
            .input('UniformNumber', sql.VarChar, row.getCell(10).value)
            .input('Amount', sql.Decimal, row.getCell(45).value)
            .input('ReceivedDate', sql.Date, row.getCell(123).value)
            .input('InvoiceKind', sql.VarChar, row.getCell(3).value)
            .input('Tax', sql.VarChar, taxKind)
            .input('CarrierNumber', sql.VarChar, '')
            .input('Memo', sql.NVarChar, '')
            .input('InvoiceIDFirst', sql.VarChar, row.getCell(13).value)
            .input('RandomCode', sql.SmallInt, row.getCell(106).value)
            .input('CreateID', sql.VarChar, loginUser.userID)
            .input('Status', sql.VarChar, '1')
            .input('SalesReturnDate', sql.Date, null)
            .execute('orders_InvoiceHeadUpdate')

          // 更新 發票對應收款紀錄
          const queryResult2 = await pool.request()
            .input('type', sql.VarChar, 'invoiceBindRecords')
            .input('OrderID', sql.VarChar, row.getCell(1).value)
            .input('InvoiceID', sql.VarChar, invoiceID)
            .input('Seq', sql.VarChar, '1')
            .input('locale', sql.VarChar, req.headers['clientlocale'])
            .execute('orders_InvoiceFunctions')
        } else {
          // 作廢 發票表頭 InvoiceHead
          const queryResult = await pool.request()
            .input('InvoiceID', sql.VarChar, invoiceID)
            .input('OrderID', sql.VarChar, row.getCell(1).value)
            .execute('orders_InvoiceHeadInvalid')
        }
      }

      // 塞入 發票明細 Invoice Detail
      invoiceDetailSeq++
      const queryResult3 = await pool.request()
        .input('InvoiceID', sql.VarChar, invoiceID)
        .input('Seq', invoiceDetailSeq)
        .input('InvoiceName', sql.NVarChar, row.getCell(19).value)
        .input('Price', sql.Decimal, row.getCell(17).value)
        .input('Qty', sql.Decimal, row.getCell(16).value)
        .input('Amount', sql.Decimal, row.getCell(18).value)
        .input('Tax', sql.Decimal, row.getCell(44).value)
        .execute('orders_InvoiceDetailUpdate')

      if (queryResult3.recordset[0].code !== 200 ){
        failCount++
      } else {
        successCount++
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