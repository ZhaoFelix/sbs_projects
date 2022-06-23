const DB = require('../config/db')

// 查询所有管理员
function queryAllAdmin() {
  return DB.queryDB('select  * from t_admin_list;')
}

// 添加管理员
function addOneAdmin(admin) {
  const { admin_name, admin_type, admin_login_name, admin_pwd, admin_token } =
    admin
  return DB.queryDB(
    'insert t_admin_list(admin_name, admin_pwd, admin_type, admin_login_name, admin_token, admin_created_time) value(?, ?, ?, ?, ?,now());',
    [admin_name, admin_pwd, admin_type, admin_login_name, admin_token]
  )
}

// 判断登录名是否已经存在
function isExistAdmin(admin_login_name) {
  return DB.queryDB(
    'select  * from t_admin_list where  admin_login_name = ?;',
    [admin_login_name]
  )
}

// 删除管理员
function deleteAdmin(admin_id) {
  return DB.queryDB(
    'update t_admin_list set admin_is_deleted = 1 where  admin_id = ? and admin_is_deleted = 0;',
    [admin_id]
  )
}
module.exports = {
  queryAllAdmin,
  addOneAdmin,
  isExistAdmin,
  deleteAdmin
}
