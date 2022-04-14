import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

// Texture Loading
const profilePicture = new THREE.TextureLoader().load('ellie.png');
const prof = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:profilePicture})
);
scene.add(prof);

const moonTex = new THREE.TextureLoader().load('moon.jpg');
const moonNorm = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshBasicMaterial({map:moonTex, normalmap:moonNorm})
)
moon.position.set(0, 10, -10);
scene.add(moon);


// Torus Setup
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lighting Setup
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// GridHelper Setup
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 20);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05; 
  moon.rotation.y += 0.075; 
  moon.rotation.z += 0.05;

  prof.rotation.y += 0.01; 
  prof.rotation.z += 0.01;

  camera.position.z = t * -0.01; 
  camera.position.x = t * -0.0002; 
  camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}

function addStar() {
  const geo = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geo, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

animate();