const express = require('express')
const router = express.Router()
const { sql, poolPromise } = require('./modules/config')

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