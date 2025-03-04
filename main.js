import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let modelHousing = document.getElementById('model-section')

let vertical = document.getElementById('vertical')
let horizontal = document.getElementById('horizontal')

let zoomIn = document.getElementById('in')
let zoomOut = document.getElementById('out')

let m1 = document.getElementById('m1')
let m2 = document.getElementById('m2')
let m3 = document.getElementById('m3')
let m4 = document.getElementById('m4')
let m5 = document.getElementById('m5')
let m6 = document.getElementById('m6')


const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();
const scene4 = new THREE.Scene();
const scene5 = new THREE.Scene();
const scene6 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 1.3, window.innerHeight / 1.3);

renderer.setAnimationLoop(animate);

modelHousing.appendChild(renderer.domElement)



camera.position.z = 5;

const loader = new GLTFLoader();


// Background
scene.background = new THREE.Color(0x1a1a1a); // Blue
scene2.background = new THREE.Color(0x1a1a1a); // Blue
scene3.background = new THREE.Color(0x1a1a1a); // Blue
scene4.background = new THREE.Color(0x1a1a1a); // Blue
scene5.background = new THREE.Color(0x1a1a1a); // Blue
scene6.background = new THREE.Color(0x1a1a1a); // Blue


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

// 3
const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(10, 10, 10);
scene3.add(light3);

const ambientLight3 = new THREE.AmbientLight(0xffffff, 1);
scene3.add(ambientLight3);

// 4
const light4 = new THREE.DirectionalLight(0xffffff, 1);
light4.position.set(10, 10, 10);
scene4.add(light4);

const ambientLight4 = new THREE.AmbientLight(0xffffff, 1);
scene4.add(ambientLight4);

// 5
const light5 = new THREE.DirectionalLight(0xffffff, 1);
light5.position.set(10, 10, 10);
scene5.add(light5);

const ambientLight5 = new THREE.AmbientLight(0xffffff, 1);
scene5.add(ambientLight5);

// 6
const light6 = new THREE.DirectionalLight(0xffffff, 1);
light6.position.set(10, 10, 10);
scene6.add(light6);

const ambientLight6 = new THREE.AmbientLight(0xffffff, 1);
scene6.add(ambientLight6);

let model = null; // To store the loaded GLTF model
let model2 = null; // To store the loaded GLTF model
let model3 = null; // To store the loaded GLTF model
let model4 = null; // To store the loaded GLTF model
let model5 = null; // To store the loaded GLTF model
let model6 = null; // To store the loaded GLTF model
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

loader.load('helmet.vrm', function (gltf) {

    model3 = gltf.scene;
    model3.position.set(0, -1, 0); // Set initial position
    model3.scale.set(10, 10, 10);   // Scale the model (adjust as needed)
    model3.rotation.set(0.3, 3.1, 0)
    scene3.add(model3);

    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model3);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play(); // Play all animations
        });
    }

}, undefined, function (error) {

    console.error(error);

});

loader.load('shield.vrm', function (gltf) {

    model4 = gltf.scene;
    model4.position.set(0, -6, 0); // Set initial position
    model4.scale.set(6, 6, 6);   // Scale the model (adjust as needed)
    model4.rotation.set(0, 2.5, 0)
    scene4.add(model4);

    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model4);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play(); // Play all animations
        });
    }

}, undefined, function (error) {

    console.error(error);

});

loader.load('sword.vrm', function (gltf) {

    model5 = gltf.scene;
    model5.position.set(0, -1, 0); // Set initial position
    model5.scale.set(0.7, 0.7, 0.7);   // Scale the model (adjust as needed)
    model5.rotation.set(-1.5, 2, -0.5)
    scene5.add(model5);

    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model5);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play(); // Play all animations
        });
    }

}, undefined, function (error) {

    console.error(error);

});

loader.load('axe.vrm', function (gltf) {

    model6 = gltf.scene;
    model6.position.set(0, -1, 0); // Set initial position
    model6.scale.set(2.5, 2.5, 2.5);   // Scale the model (adjust as needed)
    model6.rotation.set(0.3, 3.1, 0)
    scene6.add(model6);

    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model6);
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

    if (model3) {
        const intersects = raycaster.intersectObject(model3, true);
        if (intersects.length > 0) {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    }

    if (model4) {
        const intersects = raycaster.intersectObject(model4, true);
        if (intersects.length > 0) {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    }

    if (model5) {
        const intersects = raycaster.intersectObject(model5, true);
        if (intersects.length > 0) {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        }
    }

    if (model6) {
        const intersects = raycaster.intersectObject(model6, true);
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
    if (model && activeScene === scene) {


        model.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
        model.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    if (model2 && activeScene === scene2) {


        model2.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
        model2.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    if (model3 && activeScene === scene3) {


        model3.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
        model3.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    if (model4 && activeScene === scene4) {


        model4.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
        model4.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    if (model5 && activeScene === scene5) {


        model5.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
        model5.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    if (model6 && activeScene === scene6) {


        model6.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
        model6.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;

    }
    else if (!isDragging || !model6) return



});


// window.addEventListener('touchstart', (event) => {
//     isDragging = true;
//     // previousMousePosition.x = event.clientX;
//     // previousMousePosition.y = event.clientY;

//     raycaster.setFromCamera(mouse, camera);

//     // Check if the mouse is over the model
//     if (model) {
//         const intersects = raycaster.intersectObject(model, true);
//         if (intersects.length > 0) {
//             isDragging = true;
//             previousMousePosition = { x: event.clientX, y: event.clientY };
//         }
//     }

//     if (model2) {
//         const intersects = raycaster.intersectObject(model2, true);
//         if (intersects.length > 0) {
//             isDragging = true;
//             previousMousePosition = { x: event.clientX, y: event.clientY };
//         }
//     }
// });

// window.addEventListener('touchend', () => {
//     isDragging = false;
// });

// window.addEventListener('touchcancel', () => {
//     isDragging = false;
// });

// window.addEventListener('touchmove', (event) => {

//     const deltaX = event.clientX - previousMousePosition.x;
//     const deltaY = event.clientY - previousMousePosition.y;

//     if (!isDragging || !model) return;
//     if (model) {


//         model.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
//         model.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

//         previousMousePosition.x = event.clientX;
//         previousMousePosition.y = event.clientY;

//     }
//     if (model2) {


//         model2.rotation.y += deltaX * 0.01; // Horizontal drag rotates around Y-axis
//         model2.rotation.x += deltaY * 0.01; // Vertical drag rotates around X-axis

//         previousMousePosition.x = event.clientX;
//         previousMousePosition.y = event.clientY;

//     }
//     else if (!isDragging || !model2) return



// });


window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && activeScene === scene) model.rotation.y += 0.1;
    if (event.key === 'ArrowLeft' && activeScene === scene) model.rotation.y -= 0.1;
    if (event.key === 'ArrowUp' && activeScene === scene) model.rotation.x += 0.1;
    if (event.key === 'ArrowDown' && activeScene === scene) model.rotation.x -= 0.1;

    if (event.key === 'ArrowRight' && activeScene === scene2) model2.rotation.y += 0.1;
    if (event.key === 'ArrowLeft' && activeScene === scene2) model2.rotation.y -= 0.1;
    if (event.key === 'ArrowUp' && activeScene === scene2) model2.rotation.x += 0.1;
    if (event.key === 'ArrowDown' && activeScene === scene2) model2.rotation.x -= 0.1;

    if (event.key === 'ArrowRight' && activeScene === scene3) model3.rotation.y += 0.1;
    if (event.key === 'ArrowLeft' && activeScene === scene3) model3.rotation.y -= 0.1;
    if (event.key === 'ArrowUp' && activeScene === scene3) model3.rotation.x += 0.1;
    if (event.key === 'ArrowDown' && activeScene === scene3) model3.rotation.x -= 0.1;

    if (event.key === 'ArrowRight' && activeScene === scene4) model4.rotation.y += 0.1;
    if (event.key === 'ArrowLeft' && activeScene === scene4) model4.rotation.y -= 0.1;
    if (event.key === 'ArrowUp' && activeScene === scene4) model4.rotation.x += 0.1;
    if (event.key === 'ArrowDown' && activeScene === scene4) model4.rotation.x -= 0.1;

    if (event.key === 'ArrowRight' && activeScene === scene5) model5.rotation.y += 0.1;
    if (event.key === 'ArrowLeft' && activeScene === scene5) model5.rotation.y -= 0.1;
    if (event.key === 'ArrowUp' && activeScene === scene5) model5.rotation.x += 0.1;
    if (event.key === 'ArrowDown' && activeScene === scene5) model5.rotation.x -= 0.1;

    if (event.key === 'ArrowRight' && activeScene === scene6) model6.rotation.y += 0.1;
    if (event.key === 'ArrowLeft' && activeScene === scene6) model6.rotation.y -= 0.1;
    if (event.key === 'ArrowUp' && activeScene === scene6) model6.rotation.x += 0.1;
    if (event.key === 'ArrowDown' && activeScene === scene6) model6.rotation.x -= 0.1;
});

let zoomSpeed = 0.4;


let activeScene = scene2;

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
    m3.className = "model inactive"
    m4.className = "model inactive"
    m5.className = "model inactive"
    m6.className = "model inactive"
}

m2.onclick = function () {
    activeScene = scene2
    m1.className = "model inactive"
    m2.className = "model active"
    m3.className = "model inactive"
    m4.className = "model inactive"
    m5.className = "model inactive"
    m6.className = "model inactive"

}

m3.onclick = function () {
    activeScene = scene3
    m1.className = "model inactive"
    m2.className = "model inactive"
    m3.className = "model active"
    m4.className = "model inactive"
    m5.className = "model inactive"
    m6.className = "model inactive"
}

m4.onclick = function () {
    activeScene = scene4
    m1.className = "model inactive"
    m2.className = "model inactive"
    m3.className = "model inactive"
    m4.className = "model active"
    m5.className = "model inactive"
    m6.className = "model inactive"
}


m5.onclick = function () {
    activeScene = scene5
    m1.className = "model inactive"
    m2.className = "model inactive"
    m3.className = "model inactive"
    m4.className = "model inactive"
    m5.className = "model active"
    m6.className = "model inactive"
}

m6.onclick = function () {
    activeScene = scene6
    m1.className = "model inactive"
    m2.className = "model inactive"
    m3.className = "model inactive"
    m4.className = "model inactive"
    m5.className = "model inactive"
    m6.className = "model active"
}



let verticalIntervalId;
vertical.addEventListener("mousedown", () => {
    verticalIntervalId = setInterval(function () {
        if (activeScene === scene) {
            model.rotation.x -= 0.1;
        } else if (activeScene === scene2) {
            model2.rotation.x -= 0.1;
        } else if (activeScene === scene3) {
            model3.rotation.x -= 0.1;
        } else if (activeScene === scene4) {
            model4.rotation.x -= 0.1;
        } else if (activeScene === scene5) {
            model5.rotation.x -= 0.1;
        } else if (activeScene === scene6) {
            model6.rotation.x -= 0.1;
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
        } else if (activeScene === scene2) {
            model2.rotation.x -= 0.1;
        } else if (activeScene === scene3) {
            model3.rotation.x -= 0.1;
        } else if (activeScene === scene4) {
            model4.rotation.x -= 0.1;
        } else if (activeScene === scene5) {
            model5.rotation.x -= 0.1;
        } else if (activeScene === scene6) {
            model6.rotation.x -= 0.1;
        }
    }, 50); // Increment every 500ms
});
vertical.addEventListener("touchend", () => {
    clearInterval(verticalIntervalId);
});
vertical.addEventListener("touchcancel", () => {
    clearInterval(verticalIntervalId);
});


let horizontalIntervalId;
horizontal.addEventListener("mousedown", () => {
    horizontalIntervalId = setInterval(function () {
        if (activeScene === scene) {
            model.rotation.y -= 0.1;
        } else if (activeScene === scene2) {
            model2.rotation.y -= 0.1;
        } else if (activeScene === scene3) {
            model3.rotation.y -= 0.1;
        } else if (activeScene === scene4) {
            model4.rotation.y -= 0.1;
        } else if (activeScene === scene5) {
            model5.rotation.y -= 0.1;
        } else if (activeScene === scene6) {
            model6.rotation.y -= 0.1;
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
        } else if (activeScene === scene2) {
            model2.rotation.y -= 0.1;
        } else if (activeScene === scene3) {
            model3.rotation.y -= 0.1;
        } else if (activeScene === scene4) {
            model4.rotation.y -= 0.1;
        } else if (activeScene === scene5) {
            model5.rotation.y -= 0.1;
        } else if (activeScene === scene6) {
            model6.rotation.y -= 0.1;
        }
    }, 50); // Increment every 500ms
});
horizontal.addEventListener("touchend", () => {
    clearInterval(horizontalIntervalId);
});
horizontal.addEventListener("touchcancel", () => {
    clearInterval(horizontalIntervalId);
});

let fovSpeed = 1;


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
zoomIn.addEventListener("touchcancel", () => {
    clearInterval(zoomInIntervalId);
});



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

zoomOut.addEventListener("touchcancel", () => {
    clearInterval(zoomOutIntervalId);
});

window.addEventListener('keydown', (event) => {
    if (event.key === 's') {
        switchScene(); // Switch scenes when the 'S' key is pressed
    }
});


// Animation
function animate() {

    if (mixer) {
        mixer.update(0.01); // Update the animations
    }

    raycaster.setFromCamera(mouse, camera);


    renderer.render(activeScene, camera);

}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 1.3, window.innerHeight / 1.3);
});