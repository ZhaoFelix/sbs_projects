<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Todo } from './todo'
import request from './utils/request'
import { parseTime } from './utils/time'

let tableData: Array<Todo> = reactive([])

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

<template>
  <el-container>
    <el-header class="header"> Todo List</el-header>
    <el-main height="" class="main">
      <add :table-data="tableData"></add>
      <todo-list :table-data="tableData"></todo-list>
    </el-main>
  </el-container>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
