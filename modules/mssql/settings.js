const express = require('express')

const router = express.Router()
const { sql, poolPromise } = require('./modules/config')
const { decrypt } =require('./modules/crypto')

router.post('/getUserAndGroupAndProg', async (req, res) => {
  try {
    const pool = await poolPromise
    const resUsers = await pool.request()
    .input('type', sql.NVarChar, 'users')
    .execute('settings_GetSetting')
    const resGroups = await pool.request()
    .input('type', sql.NVarChar, 'groups')
    .execute('settings_GetSetting')
    const resProglist = await pool.request()
    .input('type', sql.NVarChar, 'proglist')
    .execute('settings_GetSetting')
    
    res.json({ 
      users: resUsers.recordset,
      groups: resGroups.recordset,
      proglist: resProglist.recordset
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
      .execute('settings_GetUserProg')
    res.json({ 
      userProg: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/getGroupProg', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('GroupID', sql.NVarChar, req.body.GroupID)
      .execute('settings_GetGroupProg')
    res.json({ 
      userProg: queryResult.recordset
    })
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/getSetting', async (req, res) => {
  try {
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('type', sql.NVarChar, req.body.type)
      .input('locale', sql.VarChar, req.headers['clientlocale'])
      .execute('settings_GetSetting')

    res.json({
      result: queryResult.recordset
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
      .input('refEmployeeID', form.refEmployeeID)
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
      .input('refEmployeeID', form.refEmployeeID)
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
    let ProgID = req.body.ProgID
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('GroupID', sql.NVarChar, req.body.GroupID)
      .input('ProgID', sql.NVarChar, req.body.ProgID)
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
    const pool = await poolPromise
    const queryResult = await pool.request()
      .input('GroupID', sql.NVarChar, req.body.GroupID)
      .input('ProgID', sql.NVarChar, req.body.ProgID)
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

module.exports = router