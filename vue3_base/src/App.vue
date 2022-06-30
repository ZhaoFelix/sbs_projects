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
import axios from 'axios'

let tableData: Array<Todo> = reactive([])

function getData() {
  axios
    .get('http://localhost:3000/todo/query/all')
    .then((res) => {
      console.log(res.data.data)
      let data = res.data
      if (data.code === 2000) {
        for (let d of data.data) {
          let todo = new Todo(d.todo, d.created_time, d.is_done)
          tableData.push(todo)
        }
      } else {
        console.log(data.message)
      }
    })
    .catch((error) => {})
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
