const { expressjwt } = require('express-jwt')
const { jwt_options } = require('../config/env')

module.exports = expressjwt({
  secret: jwt_options.PRIVATE_KEY,
  algorithms: ['HS256']
}).unless({
  // 不适用jwt认证的路由白名单
  path: [/\/docs*/, '/']
})
