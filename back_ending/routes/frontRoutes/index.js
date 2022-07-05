var express = require('express')
var router = express.Router()
const Result = require('../../config/result')
const { getAsyncRoutes } = require('../../services/frontRoutes')
// 返回前端路由
router.get('/getAsyncRoutes', function (req, res, next) {
  const { name } = req.query
  return res.send({
    code: 0,
    info: []
  })
})

module.exports = router
