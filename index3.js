import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { OBJLoader } from 'OBJLoader';

console.log(OrbitControls);

//장면추가
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xEEEEEE); 


//매쉬
const geometry01 = new THREE.BoxGeometry(0.5,0.5,0.5 );
const material01 = new THREE.MeshStandardMaterial({
  color:0x999999});
const obj01 = new THREE.Mesh(geometry01, material01);
scene.add(obj01);    

const loader = new OBJLoader();
// load a resource
loader.load(
	// resource URL
	'Tree1.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

//카메라
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const fov = 70;
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


//빛

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1.5, 1.5 , -0.5);
  const dlHelper = new THREE.DirectionalLightHelper
  (directionalLight, 0.2, 0x0000ff);
  scene.add(dlHelper);
  scene.add(directionalLight);
  directionalLight.castShadow = true; // 그림자 0
  // directionalLight.shadow.mapSize.width = 1024;
  // directionalLight.shadow.mapSize.height  = 1024;
  directionalLight.shadow.radius = 6


  



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

