<template>
  <div >
    <canvas id="three" width="1200" height="900"></canvas>
  </div>
</template>
 
<script setup lang='ts'>
import { onMounted } from 'vue'
import {Scene,PerspectiveCamera,WebGLRenderer,AxesHelper,GridHelper,BoxGeometry,MeshBasicMaterial,Mesh,PlaneGeometry,TextureLoader,MeshPhysicalMaterial,RepeatWrapping,Vector2,EquirectangularReflectionMapping} from 'three'

// 全局对象
const scene:Scene = new Scene();
const camera:PerspectiveCamera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let renderer:WebGLRenderer,cube:Mesh;
const axesHelper:AxesHelper = new AxesHelper(3); 

const addCube = ()=>{
  const geometry:BoxGeometry = new BoxGeometry( 1, 1, 1 );
  const material:MeshBasicMaterial = new MeshBasicMaterial( { color: '#ff0000' } );
  cube = new Mesh( geometry, material );
  // 方法1：分开设置
  // cube.position.x = 0.7
  // cube.position.y = -0.6
  // cube.position.z = 5
  // 方法2：合并设置
  cube.position.set(0.7,-0.6,1) 

  scene.add( cube ); 
}

const addAxesHelper = () =>{
  // 红色 正x
  // 绿色 正y
  // 蓝色 正z
  scene.add(axesHelper)
}

onMounted(()=>{ 
  const dom: HTMLCanvasElement = document.querySelector('#three') as HTMLCanvasElement  
  if (dom) {
    //场景  
    renderer = new WebGLRenderer({
      canvas: dom,
      alpha: true, //是否背景可以透明
      antialias: true, //抗拒齿
    }); 
    renderer.setSize( window.innerWidth, window.innerHeight ); 

    addCube()
    addAxesHelper();
    camera.position.z = 3;
    camera.position.y = 1;
    camera.position.x = 1;
      
    console.log(cube.position.distanceTo(camera.position)) // 计算对象和摄像头的距离
    cube.position.normalize() // 使之变成1
    console.log(cube.position.length())

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