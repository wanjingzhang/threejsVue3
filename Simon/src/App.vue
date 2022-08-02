<!--  -->
<template>
   <div>
       <threejs/> 
   </div>
</template>

<script setup lang='ts'>
import threejs from './components/threejs.vue'
import customDirective from './components/customDirective.vue'
</script>

<style>
html,div,body{
    margin:0;padding:0;border:0;overflow: hidden;
    outline:none;/* 拖动时没有蓝色大纲 */
}
#three{background-color: black;}
</style>