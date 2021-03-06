const mysql = require('mysql')
const env = require('./env')
let pool = mysql.createPool(env.IS_DEV ? env.dev.dbInfo : {})

// let pool = mysql.createConnection(env.dev.dbInfo)
function queryDB(sql, params = '1') {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (error, connection) {
      if (error) {
        reject('连接失败，error:' + error)
      } else {
        connection.query(sql, params, function (error, results) {
          if (error) {
            reject('查询失败，error:' + error)
          } else {
            resolve(results)
          }
        })
        pool.releaseConnection(connection)
      }
    })
  })
}

module.exports = {
  queryDB,
}
