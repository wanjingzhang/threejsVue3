<!-- 自定义指令 --> 
<template>
  <h1>根元素</h1>
  <div style="position: relative">
    <div v-move style="background: red; width: 100px; height: 100px; position: absolute"></div>
  </div>
</template>

<script setup lang="ts">
import {Directive} from "vue";

const vMove:Directive = {
  mounted: (el: HTMLElement) => {
    const mouseDown = (e: MouseEvent) => { 
      const move = (e: MouseEvent) => {
        console.log(e.clientX + 'px')
        console.log(e.clientY + 'px')
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
      })
    }
    el.addEventListener('mousedown', mouseDown)
  }
}
</script>

<style scoped>
.wrap {
  width: 200px;
  height: 200px;
  background-color: #f9f9f9;
}
</style>

