var express = require('express')
var router = express.Router()
const {
  queyAllTodo,
  addOneTodo,
  doneTodo,
  deleteTodo
} = require('../../service/todo')
var Result = require('../../config/result')
// 查询todo
router.get('/query/all', function (req, res, next) {
  queyAllTodo()
    .then((data) => {
      return new Result(data, '查询成功').success(res)
    })
    .catch((error) => {
      console.log(error)
      return new Result(error, '查询失败').fail(res)
    })
})
// 添加todo
router.get('/add/one', function (req, res, next) {
  const { todo } = req.query
  addOneTodo(todo)
    .then((data) => {
      return new Result(data, '添加成功').success(res)
    })
    .catch((error) => {
      return new Result(error, '添加失败').fail(res)
    })
})

// 完成todo
router.get('/update/done', function (req, res, next) {
  const { id } = req.query
  doneTodo(id)
    .then((data) => {
      return new Result(data, '更新成功').success(res)
    })
    .catch((error) => {
      return new Result(error, '更新失败').fail(res)
    })
})

// 删除todo
router.get('/delete/one', function (req, res, next) {
  const { id } = req.query
  deleteTodo(id)
    .then((data) => {
      return new Result(data, '删除成功').success(res)
    })
    .catch((error) => {
      return new Result(error, '删除失败').fail(res)
    })
})

module.exports = router
