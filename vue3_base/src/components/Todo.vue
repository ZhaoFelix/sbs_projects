<template>
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
            <el-button type="success" size="small" @click="doneTask(scope.row)">
              {{ scope.row.isDone ? '未完成' : '完成' }}</el-button
            >
            <el-button type="danger" size="small" @click="deleteTask(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Todo } from '../type/todo'
import { defineProps } from 'vue'

const props: any = defineProps({
  tableData: Array
})

// 完成
function doneTask(row: Todo) {
  row.isDone = !row.isDone
}
// 删除
function deleteTask(row: Todo) {
  let index = props.tableData.indexOf(row)
  console.log('删除' + index)
  if (index != -1) {
    props.tableData.splice(index, 1)
  }
}
</script>
