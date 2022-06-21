var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '测试1' })
})

router.get('/b', function (req, res, next) {
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
