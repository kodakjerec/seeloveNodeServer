/*
AES+CBC 加解密
 */
var CryptoJS = require("crypto-js")

module.exports = {
// 加密
encrypt (word, keyStr, ivStr) {
  keyStr = keyStr || 'seeLove_83799375'
  ivStr = ivStr || 'seeLove_83799375'
  let key = CryptoJS.enc.Utf8.parse(keyStr)
  let iv = CryptoJS.enc.Utf8.parse(ivStr)
  let srcs = CryptoJS.enc.Utf8.parse(word)

  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return encrypted.toString()
},

// 解密
decrypt (word, keyStr, ivStr) {
  keyStr = keyStr || 'seeLove_83799375'
  ivStr = ivStr || 'seeLove_83799375'
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  let iv = CryptoJS.enc.Utf8.parse(ivStr)

  var decrypt = CryptoJS.AES.decrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return decrypt.toString(CryptoJS.enc.Utf8)
}
}