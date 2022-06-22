// 管理员相关接口

var express = require('express')
var router = express.Router()
const DB = require('../config/db')
const Result = require('../config/result')

// 查询所有的管理员
router.get('/query/all', function (req, res, next) {
  DB.queryDB('select  * from t_admin_list;', function (error, results, fields) {
    if (error) {
      new Result([], 'error', { error: error }).fail(res)
    } else {
      new Result(results, 'success', { length: 12 }).success(res)
    }
  })
})

// 添加管理员
router.post('/add/one', function (req, res, next) {
  const admin = req.body
  // 对象解析
  const { admin_name, admin_type, admin_login_name, admin_pwd, admin_token } =
    admin
  DB.queryDB(
    'insert t_admin_list(admin_name, admin_pwd, admin_type, admin_login_name, admin_token, admin_created_time)value(?, ?, ?, ?,now());',
    [admin_name, admin_pwd, admin_type, admin_login_name, admin_token],
    function (error, results, fields) {
      if (error) {
        new Result('添加失败', error).fail(res)
      } else {
        new Result(results, '添加成功').success(res)
      }
    }
  )
})
module.exports = router
