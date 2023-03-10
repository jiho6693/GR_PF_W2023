import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
//import { OBJLoader2 } from "https://unpkg.com/three@0.139.2/jsm/loaders/OBJLoader2.js";


console.log(OrbitControls);

//장면추가
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xEEEEEE); 

//매쉬
const geometry01 = new THREE.BoxGeometry(0.5,0.5,0.5 );
const material01 = new THREE.MeshStandardMaterial({
color:0x999999
});
const obj01 = new THREE.Mesh(geometry01, material01);
scene.add(obj01);    

//카메라
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const fov = 150;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1  ;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera)

//렌더러
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera,renderer.domElement);

orbitControls.update();



  



function render(time) {
time *= 0.0005;  // convert time to seconds  



renderer.render(scene, camera);

requestAnimationFrame(render);
}
requestAnimationFrame(render);

// 반응형 처리

function onWindowResize(){
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

