import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import background from "../../resources/solar-system/stars.jpg";
import sunSurface from "../../resources/solar-system/sun.jpg";
import mercurySurface from "../../resources/solar-system/mercury.jpg";
import venusSurface from "../../resources/solar-system/venus.jpg";
import earthSurface from "../../resources/solar-system/earth.jpg";
import marsSurface from "../../resources/solar-system/mars.jpg";
import jupiterSurface from "../../resources/solar-system/jupiter.jpg";
import saturnSurface from "../../resources/solar-system/saturn.jpg";
import saturnRingTexture from "../../resources/solar-system/saturn ring.png";
import uranusSurface from "../../resources/solar-system/uranus.jpg";
import neptuneSurface from "../../resources/solar-system/neptune.jpg";
import { TrackballControls } from "three/examples/jsm/Addons.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  background,
  background,
  background,
  background,
  background,
  background,
]);

//sun

const sunData = {
  name: "sun",
  radius: 60,
  texture: sunSurface,
  position: 0,
  orbitalPeriod: 0,
  rotationPeriod: 0.01068 / 60,
};
const sunGeomatry = new THREE.SphereGeometry(sunData.radius, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunData.texture),
});
const sun = new THREE.Mesh(sunGeomatry, sunMaterial);
scene.add(sun);
const pointLight = new THREE.PointLight(0xffffff, 20148, 4296);
scene.add(pointLight);

//orbitalPeriod : radiants per day
//rotationPeriod : radiants per hour
//divivded it by 60 to make it human readable

const planetData = [
  {
    name: "mercury",
    radius: 0.21,
    texture: mercurySurface,
    position: 65,
    orbitalPeriod: 0.0714 / 60,
    rotationPeriod: 0.00447 / 60,
  },
  {
    name: "venus",
    radius: 0.52,
    texture: venusSurface,
    position: 69,
    orbitalPeriod: 0.0279 / 60,
    rotationPeriod: 0.00108 / 60,
  },
  {
    name: "earth",
    radius: 0.55,
    texture: earthSurface,
    position: 73,
    orbitalPeriod: 0.0172 / 60,
    rotationPeriod: 0.2618 / 60,
  },
  {
    name: "mars",
    radius: 0.29,
    texture: marsSurface,
    position: 80,
    orbitalPeriod: 0.0091 / 60,
    rotationPeriod: 0.2554 / 60,
  },
  {
    name: "jupiter",
    radius: 6,
    texture: jupiterSurface,
    position: 127,
    orbitalPeriod: 0.00145 / 60,
    rotationPeriod: 0.6344 / 60,
  },
  {
    name: "saturn",
    radius: 5.02,
    texture: saturnSurface,
    position: 183,
    orbitalPeriod: 0.000584 / 60,
    rotationPeriod: 0.5872 / 60,
    ring: {
      innerRadius: 5.02,
      outerRadius: 10.02,
      texture: saturnRingTexture,
    },
  },
  {
    name: "uranus",
    radius: 2.18,
    texture: uranusSurface,
    position: 307,
    orbitalPeriod: 0.000205 / 60,
    rotationPeriod: 0.3652 / 60,
  },
  {
    name: "neptune",
    radius: 2.12,
    texture: neptuneSurface,
    position: 428,
    orbitalPeriod: 0.000104 / 60,
    rotationPeriod: 0.3907 / 60,
  },
];

function createPlanet(radius, texture, position, ring) {
  const geometry = new THREE.SphereGeometry(radius, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geometry, material);
  const object = new THREE.Object3D();
  object.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    object.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(object);
  mesh.position.x = position;

  return { mesh, object };
}

const planets = planetData.map((data) => {
  if (data.ring) {
    return createPlanet(data.radius, data.texture, data.position, data.ring);
  } else {
    return createPlanet(data.radius, data.texture, data.position);
  }
});

//===================================================================================================

const initial = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

initial.position.set(30, 140, 500);
let camera = initial;
let orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const initialView = document.getElementById("initial");
initialView.addEventListener("click", () => {
  orbit.dispose();
  camera = initial;
  orbit = new TrackballControls(camera, renderer.domElement);
  orbit.update();
});

const sunButton = document.getElementById("sun");
sunButton.addEventListener("click", () => {
  orbit.dispose();
  camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000 // far
  );
  camera.position.set(0, 0, 0);
  sun.add(camera);
  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.update();
});

const cameras = planets.map((planet, index) => {
  const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000 // far
  );
  camera.position.set(0, 0, 0);
  return camera;
});

const planetButtons = planetData.map((planet) =>
  document.getElementById(planet.name)
);

planetButtons.forEach((button, index) =>
  button.addEventListener("click", () => {
    orbit.dispose();
    camera = cameras[index];
    planets[index].object.add(camera);
    planets[index].mesh.add(camera);
    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();
  })
);

function animate() {
  sun.rotateY(sunData.rotationPeriod);
  planets.forEach((planet, index) => {
    const data = planetData[index];
    planet.mesh.rotateY(data.rotationPeriod);
    planet.object.rotateY(data.orbitalPeriod);
  });
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
