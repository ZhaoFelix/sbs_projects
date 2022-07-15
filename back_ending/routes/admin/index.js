var express = require('express')
var router = express.Router()
const {
  loginService,
  queryAdminTotalPage,
  queryAdminByPage,
} = require('../../services/admin')
const Result = require('../../config/result')
router.post('/login', function (req, res, next) {
  const admin = req.body
  loginService(admin)
    .then((data) => {
      return new Result(data, '登录成功').success(res)
    })
    .catch((error) => {
      return new Result(error).fail(res)
    })
})

router.get('/query/by/page', function (req, res, next) {
  let configOption = {}
  queryAdminTotalPage()
    .then((data) => {
      configOption = data[0]
      return queryAdminByPage()
    })
    .then((data) => {
      return new Result(data, '查询成功', configOption).success(res)
    })
    .catch((error) => {
      return new Result(error).fail(res)
    })
})

module.exports = router
