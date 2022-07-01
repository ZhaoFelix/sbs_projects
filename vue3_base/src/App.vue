<template>
  <el-container>
    <el-header class="header"> Todo List</el-header>
    <el-main height="" class="main">
      <add :table-data="tableData"></add>
      <todo-list :table-data="tableData"></todo-list>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Todo } from './type/todo'
import Add from './components/Add.vue'
import TodoList from './components/Todo.vue'
import { parseTime } from './utils/time'
import request from './utils/request'
let tableData: Array<Todo> = reactive([])
import { ElMessage } from 'element-plus'

function getData() {
  request
    .get('/todo/query/all')
    .then((res) => {
      for (let d of res.data) {
        let todo = new Todo(d.todo, d.id, d.is_done, parseTime(d.created_time))
        tableData.push(todo)
      }
    })
    .catch((error) => {
      ElMessage({
        message: error,
        type: 'error',
        duration: 2000
      })
    })
}
getData()
</script>

<style>
body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  line-height: 60px;
  font-weight: bold;
}
</style>
