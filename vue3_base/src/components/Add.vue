<template>
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
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { Todo } from '../type/todo'
let todo = ref<string>('')
const props: any = defineProps({
  tableData: Array
})
// 添加
function addTask() {
  if (todo.value != '') {
    props.tableData.push(new Todo(todo.value, '2022-06-29'))
  }
}
</script>
