// 管理员相关接口

var express = require('express')
var router = express.Router()
const DB = require('../config/db')
const Result = require('../config/result')
const url = require('url')

const {
  queryAllAdmin,
  addOneAdmin,
  isExistAdmin,
  deleteAdmin
} = require('../service/admin')
// 查询所有的管理员
router.get('/query/all', function (req, res, next) {
  queryAllAdmin()
    .then((data) => {
      new Result(data, 'success', { length: 12 }).success(res)
    })
    .catch((error) => {
      new Result([], 'error', { error: error }).fail(res)
    })
})

// 添加管理员
router.post('/add/one', function (req, res, next) {
  const admin = req.body
  // 1. 判断用户名是否存在
  // 2. 密码是否有效
  // 3. 添加操作
  const { admin_login_name } = admin
  isExistAdmin(admin_login_name)
    .then((data) => {
      if (data.length >= 1) {
        return new Result('用户名重复').fail(res)
      } else {
        // 添加
        addOneAdmin(admin)
          .then((data) => {
            new Result(data, 'success').success(res)
          })
          .catch((error) => {
            new Result([], 'error', { error: error }).fail(res)
          })
      }
    })
    .catch((error) => {
      new Result([], '查询用户名失败', { error: error }).fail(res)
    })
})

// 删除管理员
router.get('/delete/one', function (req, res, next) {
  let obj = url.parse(req.url, true)
  let admin_id = obj.query.admin_id

  deleteAdmin(admin_id)
    .then((data) => {
      new Result(data, 'success').success(res)
    })
    .catch((error) => {
      new Result([], '删除失败', { error: error }).fail(res)
    })
})

module.exports = router
