import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { OBJLoader } from 'OBJLoader';
import { DirectionalLight } from 'three';

console.log(OrbitControls);

//장면추가
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xEEEEEE); 

//땅
const geometry = new THREE.PlaneGeometry(20,20 );
const material = new THREE.MeshStandardMaterial({
  color:0xffffff,
  side: THREE.DoubleSide});
const ground = new THREE.Mesh(geometry, material);
ground.position.x= 0
ground.position.y= -1.5
ground.rotation.x = Math.PI / 2;
scene.add(ground);  
ground.receiveShadow = true;
ground.castShadow = true;

//벽
const geometry01 = new THREE.PlaneGeometry(5,3 );
const material01 = new THREE.MeshStandardMaterial({
  color:0xffffff,
  side: THREE.DoubleSide});
const frontwall = new THREE.Mesh(geometry01, material01);
frontwall.position.z= +2.5
scene.add(frontwall);  
frontwall.receiveShadow = true;
frontwall.castShadow = true;

const backwall = new THREE.Mesh(geometry01, material01);
backwall.position.z= -2.5
scene.add(backwall); 
backwall.receiveShadow = true;
backwall.castShadow = true;

const rightwall = new THREE.Mesh(geometry01, material01);
rightwall.position.x= +2.5
rightwall.rotation.y = Math.PI / 2;
scene.add(rightwall)
rightwall.receiveShadow = true;
rightwall.castShadow = true;

const geometry02 = new THREE.PlaneGeometry(5,1.5)
const leftwall = new THREE.Mesh(geometry02, material01);
leftwall.position.x= -2.5
leftwall.position.y= -0.75
leftwall.rotation.y = Math.PI / 2;
scene.add(leftwall)
leftwall.castShadow = true;
leftwall.receiveShadow = true;

const geometry03 = new THREE.PlaneGeometry(5,5)
const floor = new THREE.Mesh(geometry03, material01);
floor.position.x= 0
floor.position.y= -1.5
floor.rotation.x = Math.PI / 2;
scene.add(floor)
floor.receiveShadow = true;
floor.castShadow = true;

// const ceil = new THREE.Mesh(geometry03, material01);
// ceil.position.x= 0
// ceil.position.y= +1.5
// ceil.rotation.x = Math.PI / 2;
// scene.add(ceil)
// ceil.castShadow = true;
// ceil.receiveShadow = true;




//obj
const loader = new OBJLoader();
// // load a resource
loader.load(
// 	// resource URL
	'Rock_1.obj',
// 	// called when resource is loaded
	function ( object ) {
    object.scale.set(0.05,0.05,0.05);
    object.position.y= -1
     object.traverse( function ( child ){
     child.castShadow = true;
     child.receiveShadow = true;
    });
 		scene.add( object );
    // object.traverse( function ( child ){
    // child.castShadow = true;
    //  });
    // obj.scene.traverse( function( child ) {
    //   if (child.isMesh){ 
    //    child.castShadow = true; 
    //    child.receiveShadow = true; 
    //   }
    // });
    
 	},
// 	// called when loading is in progresses
 	function ( xhr ) {

 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

 	},
// 	// called when loading has errors
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
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera,renderer.domElement);

orbitControls.update();


//빛

const directionalLight = new THREE.DirectionalLight(0xF9E79F , 0.2);
  directionalLight.position.set(-9, 0 , 0);
  const dlHelper = new THREE.DirectionalLightHelper
  (directionalLight, 0.2, 0x0000ff);
  scene.add(dlHelper);
  scene.add(directionalLight);
  directionalLight.castShadow = true; // 그림자 0
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height  = 1024;
  directionalLight.shadow.radius = 1

const light = new THREE.AmbientLight( 0x404040, 2.0); // soft white light
scene.add( light );


function render(time) {
time *= 0.00005;  // convert time to seconds  
directionalLight.position.y = Math.cos( time ) * 5.75 + 1.25;

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

