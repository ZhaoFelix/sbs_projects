var express = require('express')
var router = express.Router()
const DB = require('../config/db')
const Result = require('../config/result')
/* GET home page. */
router.get('/', function (req, res, next) {
  DB.queryDB('select  * from admin_list;', function (error, results, fields) {
    if (error) {
      new Result([], 'error', { error: error }).fail(res)
    } else {
      new Result(results, 'success', { length: 12 }).success(res)
    }
  })
})

router.get('/b', function (req, res, next) {
  console.log('测试')
  // 返回响应
  res.send({
    message: 'success'
  })
})

router.get('/c', function (req, res, next) {
  res.send({
    message: 'success1'
  })
})

module.exports = router
