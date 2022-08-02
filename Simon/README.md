##### 必备的3个元素

* scene 场景：可以存放object对象，model模型，light灯光的容器
* object 对象：(primitive geomety原始几何体，Material材料=>Mesh颜色网格)，models模型，Particles粒子，Light灯光
* camera 摄像机：透视,人眼视角近大远小。75度
* render 渲染器：

##### transform 对象4种方式，任何对象都具有这4个属性

* position
* scale
* rotation
* quaternion 四元数，matrices 矩阵

##### position继承自Vector3，它有很多内置的方法

* length 长度
* distanceTo 两个物体直接的距离
* lookAt 摄像头看向的方向

##### scale继承自Vector3

##### AxesHelper 轴帮助

#### Group

##### requesAnimationFrame 时间调度
Clock 绝对不要使用 getDelta 它绝对会有问题

#### GreenSock库 GreenSock Animation Platform 
npm install gsap@3.5.1 -S
别的版本也许会报错，

##### Control
DeviceOrientationControl 手机上使用的控制器，但是ios不支持
FlyControl 飞行控制器
FirstPersonControl 第一人称控制器 类似fly，不同的是可以向上或向下看
PointerLockControl 跟随鼠标，鼠标不见了
OrbitControl 轨道控制器一直会看向某物体 Cool
TrackballControl 可以旋转视角，悬浮在空中的物体会很立体

##### Resize
window.devicePixelRatio 设备像素比

