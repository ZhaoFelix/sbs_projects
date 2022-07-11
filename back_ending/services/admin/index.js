const DB = require('../../config/db')
const jwt = require('jsonwebtoken')
const { jwt_options } = require('../../config/env')
function loginService(admin) {
  const { username, password } = admin
  return DB.queryDB(
    'select admin_id from t_admin_list where admin_name = ?',
    username
  )
    .then((data) => {
      if (data.length == 0) {
        return Promise.reject('登录名不存在或者登录名错误')
      } else {
        return DB.queryDB(
          'select admin_id from t_admin_list where admin_name = ? and admin_pwd = ?',
          [username, password]
        )
      }
    })
    .then((data) => {
      if (data.length == 0) {
        return Promise.reject('密码不正确')
      } else {
        const token = jwt.sign(
          { username: username },
          jwt_options.PRIVATE_KEY,
          {
            expiresIn: jwt_options.JWT_EXPIRED,
          }
        )
        return Promise.resolve({
          admin: username,
          token: token,
          expires: jwt_options.JWT_EXPIRED,
        })
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

module.exports = {
  loginService,
}
