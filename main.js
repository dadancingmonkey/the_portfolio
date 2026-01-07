import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF); // light blue background

// camera
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 2);
camera.lookAt(0, 0, 0);


const loader = new FontLoader();
const font = await loader.loadAsync( 'fonts/Arial_Regular.json' );
const geometry = new TextGeometry( 'Johnnys portfolio', {
	font: font,
	size: 1,
	depth: 0.2,
	curveSegments: 12
} );
geometry.center();
const material = new THREE.MeshNormalMaterial();
const text = new THREE.Mesh( geometry, material );
scene.add( text );

const linematerial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( -3, 4, 0 ) );
points.push( new THREE.Vector3( 0, 1, 0 ) );
points.push( new THREE.Vector3( 3, 4, 0 ) );

const linegeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( linegeometry, linematerial );
scene.add( line );

const carloader = new GLTFLoader();

carloader.load( 'models/lancia integrale (1).glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {

	console.error( error );

} );


// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial( { color: 0xFFC0CB } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

function animate() {	
	renderer.render( scene, camera );
}


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );