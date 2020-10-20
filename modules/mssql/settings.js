const express = require('express')

const router = express.Router()
const { sql, poolPromise } = require('./modules/config')
const { decrypt } =require('./modules/crypto')

router.post('/getObject', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.NVarChar, req.body.type)
      .input('ID', sql.NVarChar, req.body.ID)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('settings_GetObject')
      
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
      .execute('settings_GetDropdownList')

    res.json({
      result: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/getUserProg', async (req, res) => {
  try {
    let UserID = decrypt(req.body.UserID)
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('UserID', sql.NVarChar, UserID)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('settings_GetUserProg')
    res.json({ 
      userProg: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})
router.post('/userNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('UserID', sql.NVarChar, decrypt(form.UserID))
      .input('Password', form.Password)
      .input('GroupID', sql.NVarChar, form.GroupID)
      .input('refEmployeeID', sql.NVarChar, form.refEmployeeID)
      .input('Status', sql.NVarChar, form.Status)
      .execute('settings_UserNew')

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
router.post('/userEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('UserID', sql.NVarChar, decrypt(form.UserID))
      .input('Password', sql.NVarChar, form.Password)
      .input('GroupID', sql.NVarChar, form.GroupID)
      .input('refEmployeeID', sql.NVarChar, form.refEmployeeID)
      .input('Status', sql.NVarChar, form.Status)
      .execute('settings_UserEdit')

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
router.post('/userUpdatePassword', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('UserID', sql.NVarChar, decrypt(form.UserID))
      .input('Password', sql.NVarChar, form.Password)
      .execute('settings_UserUpdatePassword')

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

router.post('/groupProgListNew', async (req, res) => {
  try {
    let row = req.body.Row
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('GroupID', sql.NVarChar, req.body.GroupID)
      .input('ProgID', sql.NVarChar, row.ProgID)
      .input('fun1', sql.TinyInt, row.fun1)
      .input('fun2', sql.TinyInt, row.fun2)
      .input('fun3', sql.TinyInt, row.fun3)
      .input('fun4', sql.TinyInt, row.fun4)
      .input('fun5', sql.TinyInt, row.fun5)
      .input('fun6', sql.TinyInt, row.fun6)
      .input('fun7', sql.TinyInt, row.fun7)
      .input('fun8', sql.TinyInt, row.fun8)
      .input('fun9', sql.TinyInt, row.fun9)
      .input('fun10', sql.TinyInt, row.fun10)
      .execute('settings_GroupProgListNew')

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
router.post('/groupProgListDel', async (req, res) => {
  try {
    let row = req.body.Row
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('GroupID', sql.NVarChar, req.body.GroupID)
      .input('ProgID', sql.NVarChar, row.ProgID)
      .execute('settings_GroupProgListDel')

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
router.post('/groupProgListEdit', async (req, res) => {
  try {
    let row = req.body.Row
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('GroupID', sql.NVarChar, req.body.GroupID)
      .input('ProgID', sql.NVarChar, row.ProgID)
      .input('fun1', sql.TinyInt, row.fun1)
      .input('fun2', sql.TinyInt, row.fun2)
      .input('fun3', sql.TinyInt, row.fun3)
      .input('fun4', sql.TinyInt, row.fun4)
      .input('fun5', sql.TinyInt, row.fun5)
      .input('fun6', sql.TinyInt, row.fun6)
      .input('fun7', sql.TinyInt, row.fun7)
      .input('fun8', sql.TinyInt, row.fun8)
      .input('fun9', sql.TinyInt, row.fun9)
      .input('fun10', sql.TinyInt, row.fun10)
      .execute('settings_GroupProgListEdit')

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
router.post('/groupNew', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('GroupID', sql.NVarChar, req.body.GroupID)
      .input('Name', sql.NVarChar, req.body.Name)
      .execute('settings_GroupNew')

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
router.post('/groupEdit', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('GroupID', sql.NVarChar, req.body.GroupID)
      .input('Name', sql.NVarChar, req.body.Name)
      .execute('settings_GroupEdit')

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

router.post('/settingsNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('Category', sql.NVarChar, form.Category)
      .input('ParentID', sql.VarChar, form.ParentID)
      .input('ID', sql.VarChar, form.ID)
      .input('Value', sql.NVarChar, form.Value)
      .input('Language', sql.TinyInt, form.Language)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('ParentCategory', sql.NVarChar, form.ParentCategory)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('settings_SettingsNew')

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
router.post('/settingsEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('Category', sql.NVarChar, form.Category)
      .input('ParentID', sql.VarChar, form.ParentID)
      .input('ID', sql.VarChar, form.ID)
      .input('Value', sql.NVarChar, form.Value)
      .input('Language', sql.TinyInt, form.Language)
      .input('Memo', sql.NVarChar, form.Memo)
      .input('ParentCategory', sql.NVarChar, form.ParentCategory)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('settings_SettingsEdit')

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
router.post('/settingsDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('Category', sql.NVarChar, form.Category)
      .input('ID', sql.VarChar, form.ID)
      .execute('settings_SettingsDelete')

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

router.post('/announcementNew', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('ID', sql.BigInt, form.ID)
      .input('StartDate', sql.Date, form.StartDate)
      .input('EndDate', sql.Date, form.EndDate)
      .input('CreateID', sql.VarChar, form.CreateID)
      .input('Caption', sql.NVarChar, form.Caption)
      .input('Text', sql.NVarChar, form.Text)
      .execute('settings_AnnouncementNew')

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
router.post('/announcementEdit', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ID', sql.BigInt, form.ID)
    .input('StartDate', sql.Date, form.StartDate)
    .input('EndDate', sql.Date, form.EndDate)
    .input('CreateID', sql.VarChar, form.CreateID)
    .input('Caption', sql.NVarChar, form.Caption)
    .input('Text', sql.NVarChar, form.Text)
    .execute('settings_AnnouncementEdit')

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
router.post('/announcementDelete', async (req, res) => {
  try {
    let form = req.body.form
    const pool = await poolPromise
    const queryResult = await pool.request()
    .input('ID', sql.BigInt, form.ID)
    .input('StartDate', sql.Date, form.StartDate)
    .input('EndDate', sql.Date, form.EndDate)
    .input('CreateID', sql.VarChar, form.CreateID)
    .input('Caption', sql.NVarChar, form.Caption)
    .input('Text', sql.NVarChar, form.Text)
    .execute('settings_AnnouncementDelete')

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

module.exports = router