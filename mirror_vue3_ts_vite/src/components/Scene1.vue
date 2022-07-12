<script setup lang="ts">
import { onMounted, onUpdated, onUnmounted } from 'vue'

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  GridHelper,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

    onMounted(() => {
      console.log('mounted!') 
      //获取dom
      const dom: HTMLCanvasElement | null = document.querySelector('#three')
      console.log(dom)
      if (dom) {
        //场景
        const scene = new Scene()
        //相机
        const camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        camera.position.z = 1;
        //设置相机坐标 
        //控制器
        const controls = new OrbitControls(camera, dom)
        //渲染器
        const renderer = new WebGLRenderer({
          canvas: dom,
          alpha: true, //是否背景可以透明
          antialias: true, //抗拒齿
        })
        //设置画布大小
        renderer.setSize(1200, 900)
        //添加场景辅助
        //添加坐标系
        scene.add(new AxesHelper(5))
        //添加网格
        scene.add(new GridHelper(2, 10))

        //接下来 创建几何体
        //添加几何体
        //创建立方体
        const geometry = new BoxGeometry(0.5, 0.5, 0.5)
        //创建材质
        const material = new MeshBasicMaterial()
        //创建mesh
        const mesh = new Mesh(geometry, material)
        mesh.position.set(0, 1, 0)
        //将mesh添加到场景中
        scene.add(mesh)
        //创建渲染函数
        const render = () => {
          //内置 定时器
          requestAnimationFrame(render)
          //将场景和相机添加到渲染器中执行 一般60次/s
          renderer.render(scene, camera)
        }
        render()
      }
    })


</script>

<template>
  <canvas id="three" width="1200" height="900"></canvas>
</template>

<style scoped></style>
