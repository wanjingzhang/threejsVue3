<template>
  <div >
    <canvas id="three" width="1200" height="900"></canvas>
  </div>
</template>
 
<script setup lang='ts'>
import { onMounted } from 'vue'
import {Scene,PerspectiveCamera,WebGLRenderer,AxesHelper,GridHelper,BoxGeometry,MeshBasicMaterial,Mesh,PlaneGeometry,TextureLoader,MeshPhysicalMaterial,RepeatWrapping,Vector2,EquirectangularReflectionMapping} from 'three'

// 全局对象
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let renderer,cube; 

const addCube = ()=>{
  const geometry = new BoxGeometry( 1, 1, 1 );
  const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new Mesh( geometry, material );
  scene.add( cube );
  console.log(scene) 
}

onMounted(()=>{
  console.log('mounted!') 
  const dom: HTMLCanvasElement = document.querySelector('#three')
  
  console.log(dom)
    if (dom) {
      //场景  
      renderer = new WebGLRenderer({
        canvas: dom,
        alpha: true, //是否背景可以透明
        antialias: true, //抗拒齿
      }); 
      renderer.setSize( window.innerWidth, window.innerHeight ); 

      addCube()
      camera.position.z = 5;

      //创建渲染函数
      const render = () => {
        //内置 定时器
        requestAnimationFrame(render)
        cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

        //将场景和相机添加到渲染器中执行 一般60次/s
        renderer.render(scene, camera)
      }
      render()
    }
})

</script>
 
<style scoped lang="less">
 
</style> 