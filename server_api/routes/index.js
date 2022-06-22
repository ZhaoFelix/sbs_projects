var express = require('express')
var router = express.Router()
const DB = require('../config/db')

/* GET home page. */
router.get('/', function (req, res, next) {
  DB.queryDB('select  * from t_admin_list;', function (error, results, fields) {
    if (error) {
      let responseJson = {
        code: 2001,
        message: 'error:' + error
      }
      res.send(responseJson)
    } else {
      console.log(fields)
      let responseJson = {
        code: 2000,
        message: 'success',
        data: results
      }
      res.send(responseJson)
    }
  })
  // res.render('index', { title: '测试1' })
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
