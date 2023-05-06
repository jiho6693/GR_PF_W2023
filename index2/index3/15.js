import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { OBJLoader } from 'OBJLoader';
import { GLTFLoader } from 'GLTFLoader';
import { DirectionalLight } from 'three';

console.log(OrbitControls);

//장면추가
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xEEEEEE); 

//카메라
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const fov = 70;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1  ;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = -2.0;
camera.position.x = -3;
camera.position.y = 0;
camera.lookAt(new THREE.Vector3(0,0,0));

//렌더러
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  alpha : true,
  antialias : true
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//orbit추가 카메라 이후에 등장
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();
orbitControls.minDistance = 0;
 orbitControls.maxDistance = 3.0;
 orbitControls.maxPolarAngle = 2.2;   //=3.14/2
 //orbitControls.maxPolarAngle = Math.PI / 2;   //=3.14/2


// //땅
//  const geometry00 = new THREE.PlaneGeometry(20,20 );
//  const material00 = new THREE.MeshStandardMaterial({
//    color:0xffffff
//    });
//  const ground = new THREE.Mesh(geometry00, material00);
//  ground.position.x= 0
//  ground.position.y= -1.5
//  ground.rotation.x = Math.PI / 2;
//  scene.add(ground);  
//  ground.castShadow = true;









//obj
const loader = new GLTFLoader();
// // load a resource
loader.load(
	// resource URL
	'../Rock1.glb',
	// called when the resource is loaded
	function ( gltf ) {
    
    gltf.scene.scale.set(0.5, 0.5, 0.5); 
    gltf.scene.position.y= -0.5
    gltf.scene.position.z= -1.8
    gltf.scene.position.x= 1
    gltf.scene.traverse( function ( child ){
      child.castShadow = true;
      child.receiveShadow = true;
     });
		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

//obj
const loader01 = new GLTFLoader();
// // load a resource
loader01.load(
	// resource URL
	'../Rock1.glb',
	// called when the resource is loaded
	function ( gltf ) {
    
    gltf.scene.scale.set(0.3, 0.2, 0.5); 
    gltf.scene.position.y= -0.7
    gltf.scene.position.z= 0.4
    gltf.scene.position.x= -0.8
	gltf.scene.rotation.z = Math.PI / 2;
    gltf.scene.traverse( function ( child ){
      child.castShadow = true;
      child.receiveShadow = true;
     });
		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);



const loader1 = new GLTFLoader();
// // load a resource
loader1.load(
	// resource URL
	'../sca.glb',
	// called when the resource is loaded
	function ( sca ) {
    sca.scene.scale.set(0.2, 0.2, 0.2); 
    
    sca.scene.position.y= -1.5;
    sca.scene.position.z= 1.1
    sca.scene.position.x= -1
    sca.scene.traverse( function ( child ){
      child.castShadow = true;
      child.receiveShadow = true;
     });
		scene.add( sca.scene );

		sca.animations; // Array<THREE.AnimationClip>
		sca.scene; // THREE.Group
		sca.scenes; // Array<THREE.Group>
		sca.cameras; // Array<THREE.Camera>
		sca.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const loader2 = new GLTFLoader();
// // load a resource
loader2.load(
	// resource URL
	'../house.glb',
	// called when the resource is loaded
	function ( sca ) {
    sca.scene.scale.set(0.01, 0.01, 0.01); 
    sca.scene.position.y= -1.58;
    sca.scene.position.z= 4;
    sca.scene.position.x= -5;
    sca.scene.traverse( function ( child ){
      child.castShadow = true;
      child.receiveShadow = true;
     });
		scene.add( sca.scene );

		sca.animations; // Array<THREE.AnimationClip>
		sca.scene; // THREE.Group
		sca.scenes; // Array<THREE.Group>
		sca.cameras; // Array<THREE.Camera>
		sca.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


 



//빛

const directionalLight = new THREE.DirectionalLight(0xFEF9E7 , 2);
  directionalLight.position.set(-9, 0 , 2);
//   const dlHelper = new THREE.DirectionalLightHelper
//   (directionalLight, 0.2, 0x0000ff);
//   scene.add(dlHelper);
  scene.add(directionalLight);
  directionalLight.castShadow = true; // 그림자 0
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height  = 1024;
  directionalLight.shadow.radius = 1
  directionalLight.shadow.bias = -0.0005;

const light = new THREE.AmbientLight( 0x404040, 0.5); // soft white light
scene.add( light );

// function animate() {
//     requestAnimationFrame( animate );
//     controls.update();
//     renderer.render( scene, camera );
//   }
//   animate()

function render(time) {
time *= 0.00009;  // convert time to seconds  
directionalLight.position.y = Math.cos( time ) * 3.75 + 1.25;

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

