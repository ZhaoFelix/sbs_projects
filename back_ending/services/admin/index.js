const DB = require('../../config/db')

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
        return Promise.resolve({
          admin: username,
          token: '235ytrew3456',
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
