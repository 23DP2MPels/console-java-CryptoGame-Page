import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


// scroll button

document.addEventListener("scroll", () => {
  const scrollToTopButton = document.querySelector(".scroll-to-top");
  if (window.scrollY > 200) {
      scrollToTopButton.style.display = "flex";
  } else {
      scrollToTopButton.style.display = "none";
  }
});

// 3d model hide
const modelHide = window.innerWidth * 0.73
console.log('asd: ' + modelHide)
console.log('asd: ' + window.innerWidth)

function checkAndHideModel() {
  if (modelHide > window.innerWidth) {
    document.getElementById("container3D").classList.add("hidden-visibility");
  } 
  // else if (730 >= window.innerWidth) {
  //   document.getElementById("container3D").classList.add("hidden-visibility");
  // } 
  else {
    document.getElementById("container3D").classList.remove("hidden-visibility");
  }
}

checkAndHideModel()
window.addEventListener('resize', checkAndHideModel);

// 3d model

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
    model.scale.set(2 * (window.innerWidth / window.innerHeight), 1, 1.5 * (window.innerWidth / window.innerHeight))
    // model.scale.set(4, 1, 3)
    
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
renderer.setSize((window.innerWidth/2), (window.innerHeight/1.5))

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