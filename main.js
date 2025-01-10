import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/4, window.innerHeight/4);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);


camera.position.z = 5;

const loader = new GLTFLoader();


// Lightings
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


let model = null; // To store the loaded GLTF model
let mixer; // To handle animations
let isDragging = false;
let mouse = new THREE.Vector2(); // To store normalized mouse coordinates
let previousMousePosition = { x: 0, y: 0 }; // Track previous mouse position
const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Plane at z = 0
const intersectionPoint = new THREE.Vector3();


// Load Model


loader.load('spartan_armour_mkv_-_halo_reach/scene.gltf', function (gltf) {

    model = gltf.scene;
    model.position.set(0, 0, 0); // Set initial position
    model.scale.set(1, 1, 1);   // Scale the model (adjust as needed)
    scene.add(model);

    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play(); // Play all animations
        });
    }

}, undefined, function (error) {

    console.error(error);

});




// Camera play around

camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

window.addEventListener('mousedown', (event) => {
    // isDragging = true;
    // previousMousePosition.x = event.clientX;
    // previousMousePosition.y = event.clientY;

    raycaster.setFromCamera(mouse, camera);

    // Check if the mouse is over the model
    if (model) {
        const intersects = raycaster.intersectObject(model, true);
        if (intersects.length > 0) {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (event) => {
    if (!isDragging || !model) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    model.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
    model.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize X
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize Y


    
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') model.rotation.y += 0.1;
    if (event.key === 'ArrowLeft') model.rotation.y -= 0.1;
    if (event.key === 'ArrowUp') model.rotation.x += 0.1;
    if (event.key === 'ArrowDown') model.rotation.x -= 0.1;
});

let zoomSpeed = 0.1;


// Animation
function animate() {
    // requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    if (mixer) {
        mixer.update(0.01); // Update the animations
    }

    if (model) {
        // Update the raycaster based on the mouse position
        raycaster.setFromCamera(mouse, camera);

        // Find intersection point with the plane
        if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
            // Smoothly move the model towards the intersection point
            model.position.x += (intersectionPoint.x - model.position.x) * 0.1;
            model.position.y += (intersectionPoint.y - model.position.y) * 0.1;
        }
    }

    renderer.render(scene, camera);

}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});