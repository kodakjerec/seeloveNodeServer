const express = require('express')
const router = express.Router()
const { sql, poolPromise } = require('./config')

router.post('/query', async (req, res) => {
  console.log(req.body)
  try {
    const pool = await poolPromise
    const result = await pool.request()
      .query('select * from CallCustomerList order by Seq')

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/insert', async (req, res) => {
  console.log(req.body)
  try {
    const pool = await poolPromise
    const result = await pool.request()
      .input('Name', sql.NVarChar, req.body.Name)
      .input('Tel', sql.VarChar, req.body.Tel)
      .input('Address', sql.NVarChar, req.body.Address)
      .query('Insert into CallCustomerList (Name, Tel, Address) values (@Name, @Tel, @Address)')

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/checkLock', async (req, res) => {
  console.log(req.body)
  try {
    const pool = await poolPromise
    const result = await pool.request()
      .input('Seq', sql.VarChar, req.body.Seq)
      .query('Select LockUserID from CallCustomerList where Seq=@Seq')

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/lockRecord', async (req, res) => {
  console.log(req.body)
  try {
    const pool = await poolPromise
    const result = await pool.request()
      .input('UserID', sql.VarChar, req.body.UserID)
      .input('Seq', sql.VarChar, req.body.Seq)
      .query('Update CallCustomerList set LockUserID=@UserID where Seq=@Seq')

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/unlockRecord', async (req, res) => {
  console.log(req.body)
  try {
    const pool = await poolPromise
    const result = await pool.request()
      .input('Seq', sql.VarChar, req.body.Seq)
      .query('Update CallCustomerList set LockUserID="" where Seq=@Seq')

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

router.post('/save', async (req, res) => {
  console.log(req.body)
  try {
    const pool = await poolPromise
    const result = await pool.request()
      .input('Seq', sql.VarChar, req.body.Seq)
      .input('Note', sql.VarChar, req.body.Note)
      .query('Update CallCustomerList set Note=@Note where Seq=@Seq')

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
