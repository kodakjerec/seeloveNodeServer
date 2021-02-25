const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')

const mime = {
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png'
}
router.get( '*' , function(req, res) {
  let filePath = path.join(__dirname, '../download', req.originalUrl)
  let type = mime[path.extname(filePath).slice(1)] || 'text/plain'
  
  let s = fs.createReadStream(filePath);
  s.on('open', function () {
      res.set('Content-Type', type);
      s.pipe(res);
  });
  s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
  });
})


module.exports = router