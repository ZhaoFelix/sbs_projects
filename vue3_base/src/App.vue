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

let tableData: Array<Todo> = reactive([
  new Todo('任务一', '2022-06-29', false),
  new Todo('任务一', '2022-06-29', false),
  new Todo('任务一', '2022-06-29', false)
])
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
