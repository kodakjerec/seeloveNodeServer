const express = require('express')
const router = express.Router()
const { sql, poolPromise } = require('./config')

router.get('/', function(req, res) {
  res.send('home page!')
})

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const pool = await poolPromise
    const result = await pool.request()
      .input('input_parameter', sql.NVarChar, req.body.input_parameter)
      .query('select top '+ Math.floor(Math.random()*20).toString() +' * from line_cell where line_id = @input_parameter')

    res.json(result.recordset)
  } catch (err) {
    res.status(500)
    res.send(err.message)
  }
})

module.exports = router
