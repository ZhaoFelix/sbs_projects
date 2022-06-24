var express = require('express')
var router = express.Router()
var boom = require('boom')
const helper = require('../utils/helper')
const Result = require('../config/result')
const jwt = require('../utils/jwt')
const swapperUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

// jwt中间件
// 要放置在所有路由前
router.use(jwt)

router.use('/docs', swapperUi.serve, swapperUi.setup(swaggerDocument))
// 扫描路由路径，自动导入接口路由
const scanResult = helper.scanDirModules(__dirname, __filename)

for (const prefix in scanResult) {
  if (scanResult.hasOwnProperty(prefix)) {
    router.use(prefix, scanResult[prefix])
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// 集中处理404
router.use((err, res, next) => {
  next(boom.notFound('接口不存在'))
})

// 中间件
router.use((err, req, res, next) => {
  if (err.name && err.name === 'UnauthorizedError') {
    const { status = 401, message } = err
    new Result(null, 'token失效', {
      error: status,
      errorMsg: message
    }).jwtError(res.status(status))
  } else {
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500
    const errorMsg =
      (err.output && err.output.payload && err.output.payload.error) ||
      err.message
    new Result(null, msg, {
      error: statusCode,
      errorMsg
    }).fail(res.status(statusCode))
  }
})

module.exports = router
