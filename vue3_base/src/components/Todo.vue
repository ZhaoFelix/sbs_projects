<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-table :data="tableData">
        <el-table-column prop="todo" label="任务"></el-table-column>
        <el-table-column prop="createTime" label="日期"></el-table-column>
        <el-table-column prop="isDone" label="是否完成">
          <template #default="scope">
            {{ scope.row.isDone ? '已完成' : '未完成' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button
              v-if="!scope.row.isDone"
              type="success"
              size="small"
              @click="doneTask(scope.row)"
            >
              完成</el-button
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
import request from '../utils/request'
import { ElMessage } from 'element-plus'

const props: any = defineProps({
  tableData: Array
})

// 完成
function doneTask(row: Todo) {
  request
    .get(`/todo/update/done?id=${row.id}`)
    .then((res) => {
      row.isDone = !row.isDone
      ElMessage({
        message: '已完成',
        type: 'info',
        duration: 2000
      })
    })
    .catch((error) => {})
}
// 删除
function deleteTask(row: Todo) {
  request
    .get(`/todo/delete/one?id=${row.id}`)
    .then((res) => {
      let index = props.tableData.indexOf(row)
      if (index != -1) {
        props.tableData.splice(index, 1)
      }
      ElMessage({
        message: '删除成功',
        type: 'warning',
        duration: 2000
      })
    })
    .catch((error) => {
      ElMessage({
        message: error,
        type: 'error',
        duration: 2000
      })
    })
}
</script>
