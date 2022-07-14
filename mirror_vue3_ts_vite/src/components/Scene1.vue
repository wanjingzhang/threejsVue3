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
  Mesh,PlaneGeometry,TextureLoader,MeshPhysicalMaterial,RepeatWrapping,Vector2,
  EquirectangularReflectionMapping
} from 'three'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";  
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

    onMounted(() => {
      console.log('mounted!') 
      //获取dom
      const dom: HTMLCanvasElement | null = document.querySelector('#three')
      console.log(dom)
      if (dom) {
        //场景
        const scene = new Scene()
        const options = {
            enableSwoopingCamera: false,
            enableRotation: false,
            color: 0xffffff,
            metalness: 0.02,
            roughness: 0.11,
            transmission: 1,
            ior: 1.73,
            reflectivity: 0.6,
            thickness: 3,
            envMapIntensity: 1.9,
            clearcoat: 1,
            clearcoatRoughness: 0.14,
            normalScale: 0.22,
            clearcoatNormalScale: 0.2,
            normalRepeat: 3,
            // attenuationTint: 0xffffff,
            // attenuationDistance: 0,
            bloomThreshold: 0.91,
            bloomStrength: 0,
            bloomRadius: 0.33,
          };
        const hdrEquirect = new RGBELoader().load(
          "../src/assets/empty_warehouse_01_2k.hdr",
          () => {
            hdrEquirect.mapping = EquirectangularReflectionMapping;
          }
        );
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
        const textureLoader = new TextureLoader();
        const bgTexture = textureLoader.load("../src/assets/texture.jpg");
        const bgGeometry = new PlaneGeometry(5, 5);
        const bgMaterial = new MeshBasicMaterial({ map: bgTexture });
        const bgMesh = new Mesh(bgGeometry, bgMaterial);
        bgMesh.position.set(0, 0, -1);
        scene.add(bgMesh);

        const normalMapTexture = textureLoader.load("../src/assets/texture.jpg");
        normalMapTexture.wrapS = RepeatWrapping;
        normalMapTexture.wrapT = RepeatWrapping;
        normalMapTexture.repeat.set(options.normalRepeat, options.normalRepeat);

        const material = new MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: options.metalness,
          roughness: options.roughness,
          transmission: options.transmission,
          ior: options.ior,
          reflectivity: options.reflectivity,
          thickness: options.thickness,
          envMap: hdrEquirect,
          envMapIntensity: options.envMapIntensity,
          clearcoat: options.clearcoat,
          clearcoatRoughness: options.clearcoatRoughness,
          normalScale: new Vector2(options.normalScale),
          normalMap: normalMapTexture,
          clearcoatNormalMap: normalMapTexture,
          clearcoatNormalScale: new Vector2(options.clearcoatNormalScale),
          // attenuationTint: options.attenuationTint,
          // attenuationDistance: options.attenuationDistance,
        });

        let mesh = null;

        // Load dragon GLTF model
        new GLTFLoader().load("../src/assets/dragon.glb", (gltf) => {
          const dragon = gltf.scene.children.find((mesh) => mesh.name === "Dragon");

          // Just copy the geometry from the loaded model
          const geometry = dragon.geometry.clone();

          // Adjust geometry to suit our scene
          geometry.rotateX(Math.PI / 2);
          geometry.translate(0, -4, 0);

          // Create a new mesh and place it in the scene
          mesh = new Mesh(geometry, material);
          mesh.scale.set(0.25, 0.25, 0.25);
          scene.add(mesh);

          // Discard the loaded model
          gltf.scene.children.forEach((child) => {
            child.geometry.dispose();
            child.material.dispose();
          });
        });
 
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
