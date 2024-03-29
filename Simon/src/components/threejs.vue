<template>
  <div class="threejs">
    <canvas id="three" width="800" height="600"></canvas>
  </div>
</template>
 
<script setup lang='ts'>
import { onMounted } from 'vue'
import {Vector3,Clock,Scene,PerspectiveCamera,OrthographicCamera,WebGLRenderer,AxesHelper,GridHelper,BoxGeometry,MeshBasicMaterial,Mesh,Group,PlaneGeometry,TextureLoader,MeshPhysicalMaterial,RepeatWrapping,Vector2,EquirectangularReflectionMapping} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js' 
import gsap from 'gsap'  

// 全局对象 
interface type{width:number,height:number}
let sizes:type = {width:window.innerWidth,height:window.innerHeight};

const aspectRatio = sizes.width / sizes.height;
const scene:Scene = new Scene();
// 1. PerspectiveCamera(视野，屏幕比例，近，远位置) 透视相机
const camera:PerspectiveCamera = new PerspectiveCamera( 75, sizes.width/sizes.height, 0.1, 1000 );
// 2. OrthographicCamera(left,right,top,bottom,近，远)正交相机
// const camera:OrthographicCamera = new OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,100 );


let renderer:WebGLRenderer,cube:Mesh,group:Group,dom: HTMLCanvasElement,controls:OrbitControls;
const axesHelper:AxesHelper = new AxesHelper(3); 
const cubes:Array<Mesh> = new Array<Mesh>(3);


// 双击全屏
window.addEventListener('dblclick',()=>{ 
  // document.fullScreenElement //W3C  
  // document.msFullscreenElement //IE 
  // document.mozFullScreenElement //火狐  
  // document.webkitFullscreenElement //谷歌  
  // document.exitFullscreen(); 
  // document.msExitFullscreen(); 
  // document.mozCancelFullScreen(); 
  // document.webkitCancelFullScreen(); 

  const fullscreenElement = document['fullscreenElement'] || document['webkitFullscreenElement'] || document['msFullscreenElement'] || document['mozFullScreenElement'];
  if(!fullscreenElement){
    if(dom.requestFullscreen){ // chrome
      dom.requestFullscreen()
    }else if(dom['webkitRequestFullscreen']){ // safari
      dom['webkitRequestFullscreen']()
    } 
  }else{
    if(document.exitFullscreen){ // chrome
      document.exitFullscreen()
    }else if(document['webkitExitFullscreen']){ // safari
      document['webkitExitFullscreen']()
    } 
  }
}) 

// 窗口大小需要3步
window.addEventListener('resize',()=>{
  console.log('resized');
  const W = window.innerWidth,H = window.innerHeight;
  // 1. 
  sizes = {width:W,height:H}
  // 2. Update camera
  camera.aspect = W/H
  camera.updateProjectionMatrix()
  // 3. Update renderer
  renderer.setSize(W,H)
  // 当人们拖动窗口去另一个窗口，不需要过高
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))  
}) 

// 鼠标控制器
interface cursorTp{x:number,y:number}
const cursor:cursorTp = {x:0,y:0}
document.addEventListener('mousemove',(e)=>{
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = -(e.clientY / sizes.height - 0.5) 
})

// 添加一个camera的控制
const addControls = ()=>{  
  controls = new OrbitControls(camera,dom)
  // 1. 更新视角位置，vector3
  // controls.target.y = 1  
  // 2. 重量，阻尼
  controls.enableDamping = true
  // 3. 禁用
  // controls.enabled = false 
}


// 添加一个对象小组
const addGroup = ()=>{
  group = new Group()
  for(let i=0;i<cubes.length;i++){
    
    cubes[i] = new Mesh(
      new BoxGeometry(1,1,1),
      new MeshBasicMaterial({color:0xff0000})
    )
    cubes[i].position.set(i*1.2,1,1)
    group.add(cubes[i])
  }

  group.position.set(0,1,0)
 
  scene.add(group)
}

// 添加一个正方形对象
const addCube = ()=>{
  const geometry:BoxGeometry = new BoxGeometry( 1, 1, 1,5,5,5 );
  const material:MeshBasicMaterial = new MeshBasicMaterial( { color: '#ff0000' } );
  cube = new Mesh( geometry, material );
  
  // 1. Position
  // 方法1：分开设置
  // cube.position.x = 0.7
  // cube.position.y = -0.6
  // cube.position.z = 5
  // 方法2：合并设置
  // cube.position.set(4.7,-0.6,1) 

  // 2. Scale
  // cube.scale.x = 2;
  // cube.scale.set(2,0.5,0.5)

  // 3. Rotation: rotation & quaternion。***gimbal lock 注意***
  // cube.rotation.reorder('YXZ')
  // cube.rotation.x = Math.PI * 0.25;
  // cube.rotation.y = Math.PI * 0.25; // 旋转半圈 == Math.PI / 2
  // cube.rotation.set(0,0,0)   
  scene.add( cube ); 
}

const addAxesHelper = () =>{
  // 红色 正x
  // 绿色 正y
  // 蓝色 正z
  scene.add(axesHelper)
}

onMounted(()=>{ 
  dom = document.querySelector('#three') as HTMLCanvasElement  
  if (dom) {
    //场景  
    renderer = new WebGLRenderer({
      canvas: dom,
      alpha: true, //是否背景可以透明
      antialias: true, //抗拒齿
    }); 
    renderer.setSize( sizes.width, sizes.height ); 

    addCube()
    // addGroup()
    // addAxesHelper();

    addControls(); 
    camera.position.set(0,0,3)
    // console.log(cube.position.distanceTo(camera.position)) // 计算对象和摄像头的距离
    // cube.position.normalize() // 使之变成1
    // console.log(camera.position.length())
    // camera.lookAt(cube.position)

    // 1. 匀速
    // let x = 1, time:number = Date.now(),currentTime:number,deltaTime:number,elapsedTime:number;
    // 2. 匀速也可以用系统的时间
    // const clock = new Clock() 
    // 3. gasp
    // gsap.to(cube.position,{duration:1,delay:1,x:2})
    // gsap.to(cube.position,{duration:1,delay:2,x:0})

    //创建渲染函数
    const tick = () => {
      // 1. 获取时间差值
      // currentTime = Date.now();
      // deltaTime = currentTime - time;
      // time = currentTime  
      
      requestAnimationFrame(tick) 
      //2. 内置 定时器
      // elapsedTime = clock.getElapsedTime()
      // group.rotation.x += 0.01 * deltaTime; // 可以让物体匀速运动
      // camera.position.y = Math.sin(elapsedTime) // elapsedTime * Math.PI * 2 // elapsedTime 
      // camera.position.x = Math.cos(elapsedTime)
      // camera.lookAt(group.position)
      // cube.rotation.y += 0.01;
      // group.rotation.x += Math.sin(x++)
      // group.rotation.x += 0.01;

      // 1. 自定义摄像机
      // camera.position.x = Math.sin(cursor.x * Math.PI*2) * 3
      // camera.position.z = Math.cos(cursor.x * Math.PI*2) * 3
      // camera.position.y = cursor.y * 5 // 上下
      // camera.lookAt(new Vector3()) = 
      // camera.lookAt(cube.position) 

      // 2. Oribit Control
      controls?.update()


      //将场景和相机添加到渲染器中执行 一般60次/s
      renderer.render(scene, camera)
    }
    tick()
  }
})

</script>
 
<style scoped lang="less">
 
</style> 