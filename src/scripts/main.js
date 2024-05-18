import * as THREE from "three";
const canvas = document.getElementById("c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// Camera
const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Scene
const scene = new THREE.Scene();

// Box
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.SphereGeometry(1, 64, 32);

// Material
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
// renderer.render(scene, camera);

function render(time) {
  //This is the definition of the render function. It takes one argument, time, which is provided by the requestAnimationFrame function and represents the number of milliseconds since the page loaded.
  time *= 0.001; // convert time from miliSeconds to seconds

  cube.rotation.x = time;
  cube.rotation.y = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render); //starts the rotation

// Light
const color = 0xffffff;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}

// const cubes = [
//   makeInstance(geometry, 0x44aa88, 0),
//   makeInstance(geometry, 0x8844aa, -2),
//   makeInstance(geometry, 0xaa8844, 2),
// ];

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function renderCubes(time) {
  //This is the definition of the render function. It takes one argument, time, which is provided by the requestAnimationFrame function and represents the number of milliseconds since the page loaded.
  time *= 0.001; // convert time from miliSeconds to seconds

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  cube.rotation.x = time;
    // cube.rotation.y = rot;
  // cubes.forEach((cube, ndx) => {
  //   const speed = 1 + ndx * 0.1;
  //   const rot = time * speed;
    
  // });

  renderer.render(scene, camera);

  requestAnimationFrame(renderCubes);
}
requestAnimationFrame(renderCubes);

// console.log(canvas.clientHeight, canvas.clientWidth);
