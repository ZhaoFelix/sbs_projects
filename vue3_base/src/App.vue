<template>
  <div>
    <button @click="minus">-</button>
    <span>{{ counter }}</span>
    <button @click="add">+</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, unref, isRef } from 'vue'
// let counter = ref<number>(0)
let counter = 0

let minus = () => {
  // counter.value -= 1
  // console.log(unref(counter))
  console.log(isRef(counter) ? counter.value : counter)
}

let add = () => {
  counter.value += 1
}

function getData() {
  console.log('获取数据')
}
getData()
</script>

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
