const { loginUser } = require('./config')

var Datastore = require('nedb')
var db = new Datastore()
db.users = new Datastore('path/to/users.db')

const userInsert = async function (UserID, token) {
  db.find({
    ID: UserID,
  }, function(err, docs) {
    if (docs.length > 0) {
      // 有找到 ID => 已登入過
      // 覆蓋
      db.update({
        ID: UserID
      }, {
        $set: {
          token: token,
          IP: loginUser.IP
        }
      })
    } else {
      // 沒找到 ID => 新用戶
      db.insert({
        ID: UserID,
        token: token,
        IP: loginUser.IP
      })
    }
  })
}

const userCheck = async function (UserID, token) {
  return new Promise((resolve, reject) => {
    db.find({
      ID: UserID,
    }, function(err, docs) {
      if (docs.length > 0) {
        // 有找到 ID => 已登入過
        // 檢查token是否相同
        // 不同則剔除
        let row = docs[0]
        if (row.token !== token) {
          return resolve(row.IP)
        } else {
          return resolve('')
        }
      } else {
        // 沒找到 ID => 新用戶
        userInsert(UserID, token)
        return resolve('')
      }
    })
  })
}

const userRemove = function (UserID) {
  db.remove({
    ID: UserID,
  })
}

module.exports = {
  userInsert, userCheck, userRemove
}
