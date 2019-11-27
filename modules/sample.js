var express = require('express')
var router = express.Router()

// post Sample
router.post('/post', function (req, res) {
  res.send('post success')
})

router.get('/get', function (req, res) {
  res.send('get success')
})

module.exports = router
