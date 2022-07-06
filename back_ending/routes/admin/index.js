var express = require('express')
var router = express.Router()
const { loginService } = require('../../services/admin')
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

module.exports = router
