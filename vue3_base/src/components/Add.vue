<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-input
        v-model="todo"
        placeholder=""
        size="default"
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
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { Todo } from '../type/todo'
import request from '../utils/request'
import { ElMessage } from 'element-plus'

let todo = ref<string>('')
const props: any = defineProps({
  tableData: Array
})
// 添加
function addTask() {
  if (todo.value != '') {
    request
      .get(`/todo/add/one?todo=${todo.value}`)
      .then((res) => {
        ElMessage({
          message: '添加成功',
          type: 'success',
          duration: 2000
        })
        props.tableData.push(new Todo(todo.value))
      })
      .catch((error) => {
        ElMessage({
          message: error,
          type: 'error',
          duration: 2000
        })
      })
  }
}
</script>
