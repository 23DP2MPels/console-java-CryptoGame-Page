import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

document.addEventListener("scroll", () => {
  const scrollToTopButton = document.querySelector(".scroll-to-top");
  if (window.scrollY > 200) {
      scrollToTopButton.style.display = "flex";
  } else {
      scrollToTopButton.style.display = "none";
  }
});

function bombarino() {
  window.location.href = 'https://www.youtube.com/watch?v=OFhMGhvW_5I';
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,
  window.innerWidth / window.innerHeight, 
  0.1,
  100
)

const loader = new GLTFLoader()
loader.load(
  'src/models/bitcoin/scene.gltf',
  (gltf) => {
    const model = gltf.scene
    model.scale.set( 6, 3, 3)
    
    object = gltf.scene;
    scene.add(model)
  }
)

let object;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// const dirLight = new THREE.DirectionalLight('white', 1)
// dirLight.position.set(5,5,5)
// scene.add(dirLight)

const light = new THREE.PointLight('white',55,90)
light.position.set(0,5,10)
scene.add(light)

// const lightHelp = new THREE.lightHelp(light, 0.5)
// scene.add(lightHelp)

camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(600, 600)

// document.body.appendChild(renderer.domElement)

document.getElementById("container3D").appendChild(renderer.domElement)

renderer.setClearColor( 0x000000, 0 )


function animate() {
  requestAnimationFrame(animate)
  // object.position.y = -mouseY /  window.innerHeight * 0.1 ;
  // object.position.x = mouseX / window.innerWidth * 0.1;
  object.rotation.z = -0.2 + (mouseX / window.innerWidth * 0.2);
  object.position.y =-(mouseY / window.innerHeight * 0.4);
  object.rotation.x = -1.8 // + (mouseY / window.innerHeight * 0.4);
  renderer.render(scene, camera)
}

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}



animate()