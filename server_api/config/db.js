const mysql = require('mysql')
const env = require('./env')
let pool = mysql.createPool(env.dev.dbInfo)

function queryDB(sql, params = '1', callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log('连接创建失败，error:' + err)
    } else {
      connection.query(sql, params, function (err, results, fields) {
        if (err) {
          console.log('查询失败，error:' + err)
          connection.release()
        } else {
          callback(err, results, fields)
        }
      })
    }
  })
}

module.exports = {
  queryDB
}
