<template>
  <el-container>
    <el-header class="header"> Todo List</el-header>
    <el-main height="" class="main">
      <el-row>
        <el-col :span="12" :offset="6">
          <el-input
            v-model="todo"
            placeholder=""
            size="normal"
            clearable
            @change=""
          >
            <template #append>
              <el-button type="primary" size="default" @click="addTask"
                >添加</el-button
              >
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-table :data="tableData">
            <el-table-column prop="todo" label="任务"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="isDone" label="是否完成">
              <template #default="scope">
                {{ scope.row.isDone ? '已完成' : '未完成' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button
                  type="success"
                  size="small"
                  @click="doneTask(scope.row)"
                >
                  {{ scope.row.isDone ? '未完成' : '完成' }}</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="deleteTask(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
    <el-footer height="" class="footer"> </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Todo } from './type/todo'
let todo = ref<string>('')
let tableData: Array<Todo> = reactive([
  new Todo('任务一', '2022-06-29', false),
  new Todo('任务一', '2022-06-29', false),
  new Todo('任务一', '2022-06-29', false)
])
// 添加
function addTask() {
  if (todo.value != '') {
    tableData.push(new Todo(todo.value, '2022-06-29', false))
  }
}
// 完成
function doneTask(row: Todo) {
  row.isDone = !row.isDone
}
// 删除
function deleteTask(row: Todo) {
  let index = tableData.indexOf(row)
  console.log('删除' + index)
  if (index != -1) {
    tableData.splice(index, 1)
  }
}
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
}
.main {
}
.footer {
}
</style>
