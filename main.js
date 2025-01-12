import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let modelHousing = document.getElementById('model-section')

let vertical = document.getElementById('vertical')
let horizontal = document.getElementById('horizontal')

let zoomIn = document.getElementById('in')
let zoomOut = document.getElementById('out')

let m1 = document.getElementById('m1')
let m2 = document.getElementById('m2')


const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 1.3, window.innerHeight / 1.3);
// renderer.setSize(modelHousing.clientWidth, modelHousing.clientHeight);
renderer.setAnimationLoop(animate);

// document.body.appendChild(renderer.domElement);
modelHousing.appendChild(renderer.domElement)

// const IMGloader = new THREE.TextureLoader();
// IMGloader.load('grid.png', (texture) => {
//   scene.background = texture; // Set the image as the background
// });

// const textureLoader = new THREE.TextureLoader();
// const backgroundTexture = textureLoader.load('grid.png');

// // Create a plane for the background
// const planeGeometry = new THREE.PlaneGeometry(50, 15); // Adjust size
// const planeMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
// const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);

// // Position the plane behind the scene
// backgroundPlane.position.z = -5; // Move it far back
// scene.add(backgroundPlane);

camera.position.z = 5;

const loader = new GLTFLoader();


// Background
scene.background = new THREE.Color(0x1a1a1a); // Blue
scene2.background = new THREE.Color(0x1a1a1a); // Blue


// Lightings
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
// 2
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(10, 10, 10);
scene2.add(light2);

const ambientLight2 = new THREE.AmbientLight(0xffffff, 1);
scene2.add(ambientLight2);


let model = null; // To store the loaded GLTF model
let model2 = null; // To store the loaded GLTF model
let mixer; // To handle animations
let isDragging = false;
let mouse = new THREE.Vector2(); // To store normalized mouse coordinates
let previousMousePosition = { x: 0, y: 0 }; // Track previous mouse position
const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Plane at z = 0
const intersectionPoint = new THREE.Vector3();


// Load Model

// CyberSpartain_v6_merged.vrm
loader.load('CyberSpartain_v4.vrm', function (gltf) {

    model = gltf.scene;
    model.position.set(0, -4, 0); // Set initial position
    model.scale.set(4, 4, 4);   // Scale the model (adjust as needed)
    model.rotation.set(0.3, 3.1, 0)
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


loader.load('CyberSpartain_v6_merged.vrm', function (gltf) {

    model2 = gltf.scene;
    model2.position.set(0, -4, 0); // Set initial position
    model2.scale.set(4, 4, 4);   // Scale the model (adjust as needed)
    model2.rotation.set(0.3, 3.1, 0)
    scene2.add(model2);

    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model2);
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
    isDragging = true;
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

    if (model2) {
        const intersects = raycaster.intersectObject(model2, true);
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

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    if (!isDragging || !model) return;
    if (model) {


        model.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
        model.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    if (model2) {


        model2.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
        model2.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    else if (!isDragging || !model2) return



});

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') model.rotation.y += 0.1;
    if (event.key === 'ArrowLeft') model.rotation.y -= 0.1;
    if (event.key === 'ArrowUp') model.rotation.x += 0.1;
    if (event.key === 'ArrowDown') model.rotation.x -= 0.1;

    if (event.key === 'ArrowRight') model2.rotation.y += 0.1;
    if (event.key === 'ArrowLeft') model2.rotation.y -= 0.1;
    if (event.key === 'ArrowUp') model2.rotation.x += 0.1;
    if (event.key === 'ArrowDown') model2.rotation.x -= 0.1;
});

let zoomSpeed = 0.4;


let activeScene = scene;

function switchScene() {
    activeScene = activeScene === scene ? scene2 : scene;
}

function setScene1() {
    activeScene = scene
}
function setScene2() {
    activeScene = scene2
}

m1.onclick = function () {
    activeScene = scene
    m1.className = "model active"
    m2.className = "model inactive"
}

m2.onclick = function () {
    activeScene = scene2
    m1.className = "model inactive"
    m2.className = "model active"
}


// vertical.onclick = function () {
//     if (activeScene === scene) {
//         model.rotation.x -= 0.1;
//     } else {
//         model2.rotation.x -= 0.1;
//     }
// }
let verticalIntervalId;
vertical.addEventListener("mousedown", () => {
    verticalIntervalId = setInterval(function () {
        if (activeScene === scene) {
            model.rotation.x -= 0.1;
        } else {
            model2.rotation.x -= 0.1;
        }
    }, 50); // Increment every 500ms
});
vertical.addEventListener("mouseup", () => {
    clearInterval(verticalIntervalId);
});
vertical.addEventListener("mouseleave", () => {
    clearInterval(verticalIntervalId);
});
vertical.addEventListener("touchstart", () => {
    verticalIntervalId = setInterval(function () {
        if (activeScene === scene) {
            model.rotation.x -= 0.1;
        } else {
            model2.rotation.x -= 0.1;
        }
    }, 50); // Increment every 500ms
});
vertical.addEventListener("touchend", () => {
    clearInterval(verticalIntervalId);
});

// horizontal.onclick = function () {
//     if (activeScene === scene) {
//         model.rotation.y -= 0.1;
//     } else {
//         model2.rotation.y -= 0.1;
//     }
// }

let horizontalIntervalId;
horizontal.addEventListener("mousedown", () => {
    horizontalIntervalId = setInterval(function () {
        if (activeScene === scene) {
            model.rotation.y -= 0.1;
        } else {
            model2.rotation.y -= 0.1;
        }
    }, 50); // Increment every 500ms
});
horizontal.addEventListener("mouseup", () => {
    clearInterval(horizontalIntervalId);
});
horizontal.addEventListener("mouseleave", () => {
    clearInterval(horizontalIntervalId);
});
horizontal.addEventListener("touchstart", () => {
    horizontalIntervalId = setInterval(function () {
        if (activeScene === scene) {
            model.rotation.y -= 0.1;
        } else {
            model2.rotation.y -= 0.1;
        }
    }, 50); // Increment every 500ms
});

horizontal.addEventListener("touchend", () => {
    clearInterval(horizontalIntervalId);
});


let fovSpeed = 1;

// zoomIn.onclick = function () {
//     camera.position.z -= zoomSpeed;
//     camera.fov = Math.max(10, camera.fov - fovSpeed) // Reduce FOV for more zoom effect
// }
let zoomInIntervalId;
zoomIn.addEventListener("mousedown", () => {
    zoomInIntervalId = setInterval(function () {
        camera.position.z -= zoomSpeed;
        camera.fov = Math.max(10, camera.fov - fovSpeed) // Reduce FOV for more zoom effect
    }, 50); // Increment every 100ms
});

zoomIn.addEventListener("mouseup", () => {
    clearInterval(zoomInIntervalId);
});
zoomIn.addEventListener("mouseleave", () => {
    clearInterval(zoomInIntervalId);
});

zoomIn.addEventListener("touchstart", () => {
    zoomInIntervalId = setInterval(function () {
        camera.position.z -= zoomSpeed;
        camera.fov = Math.max(10, camera.fov - fovSpeed) // Reduce FOV for more zoom effect
    }, 50); // Increment every 100ms
});

zoomIn.addEventListener("touchend", () => {
    clearInterval(zoomInIntervalId);
});


// zoomOut.onclick = function () {
//     camera.position.z += zoomSpeed;
//     camera.fov = Math.min(75, camera.fov + fovSpeed); // Increase FOV for less zoom effect
// }

let zoomOutIntervalId;

zoomOut.addEventListener("mousedown", () => {
    zoomOutIntervalId = setInterval(function () {
        camera.position.z += zoomSpeed;
        camera.fov = Math.max(10, camera.fov + fovSpeed) // Reduce FOV for more zoom effect
    }, 50); // Increment every 100ms
});

zoomOut.addEventListener("mouseup", () => {
    clearInterval(zoomOutIntervalId);
});
zoomOut.addEventListener("mouseleave", () => {
    clearInterval(zoomOutIntervalId);
});

zoomOut.addEventListener("touchstart", () => {
    zoomOutIntervalId = setInterval(function () {
        camera.position.z += zoomSpeed;
        camera.fov = Math.max(10, camera.fov + fovSpeed) // Reduce FOV for more zoom effect
    }, 50); // Increment every 100ms
});

zoomOut.addEventListener("touchend", () => {
    clearInterval(zoomOutIntervalId);
});

window.addEventListener('keydown', (event) => {
    if (event.key === 's') {
        switchScene(); // Switch scenes when the 'S' key is pressed
    }
});


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
        // if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
        //     // Smoothly move the model towards the intersection point
        //     model.position.x += (intersectionPoint.x - model.position.x) * 0.1;
        //     model.position.y += (intersectionPoint.y - model.position.y) * 0.1;
        // }
    }
    if (model2) {
        // Update the raycaster based on the mouse position
        raycaster.setFromCamera(mouse, camera);

        // Find intersection point with the plane
        // if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
        //     // Smoothly move the model towards the intersection point
        //     model2.position.x += (intersectionPoint.x - model2.position.x) * 0.1;
        //     model2.position.y += (intersectionPoint.y - model2.position.y) * 0.1;
        // }
    }

    renderer.render(activeScene, camera);

}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 1.3, window.innerHeight / 1.3);
});