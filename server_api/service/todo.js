const DB = require('../config/db')
// 查询所有todo
function queyAllTodo() {
  return DB.queryDB(
    'select * from t_dodo_list where is_deleted != 0 order by created_time'
  )
}
// 添加todo
function addOneTodo(todo) {
  if (todo == undefined) {
    return Promise.reject('添加内容为空')
  } else {
    return DB.queryDB('insert into t_dodo_list(todo) value(?);', todo)
  }
}

// 完成
function doneTodo(id) {
  if (id === undefined) {
    return Promise.reject('id为空')
  } else {
    return DB.queryDB(
      'select id from t_dodo_list where id=? and is_done = 1',
      id
    )
      .then((data) => {
        if (data.length == 1) {
          return Promise.resolve(`id为${id}todo已完成`)
        } else {
          return DB.queryDB(
            'update  t_dodo_list set is_done = 1,done_time = now() where  id = ? and is_done = 0;',
            id
          )
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}

// 删除
function deleteTodo(id) {
  if (id === undefined) {
    return Promise.reject('id为空')
  } else {
    return DB.queryDB(
      'update t_dodo_list set is_deleted = 1 where id = ? and is_deleted = 0',
      id
    )
  }
}
module.exports = {
  queyAllTodo,
  addOneTodo,
  doneTodo,
  deleteTodo
}
