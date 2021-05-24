import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import "./components/lamborghini";
import "./components/html_animations";

import gsap from 'gsap';

let loaderRan = false;
const runLoader = () => {
    const loadPercentage = Math.floor(window.loaded/totalLoaded * 100);
    document.querySelector(".load-percent").textContent = 
    document.querySelector(".loader-progress").style.width = `${loadPercentage}%`;
    if(loadPercentage === 100 && !loaderRan) {
        window.html_animations();
        setTimeout(() => {
            let tl = gsap.timeline();
            gsap.to(".loaderTopHalf", { duration: 0.8, top: "-50%",});
            tl.to(".loaderBottomHalf", { duration: 0.8, bottom: "-50%",});
            tl.to(".loader-overlay", { duration: 0, display: "none"});
            window.lamborghiniLoop();
        }, 800);
        loaderRan = true;
    }
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');
window.loaded = 0;
window.totalLoaded = 0;

// window.scene
window.scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    window.camera.aspect = sizes.width / sizes.height
    window.camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Lights
 */
window.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
window.scene.add(window.ambientLight);

/**
 * Camera
 */
// Base camera
window.camera = new THREE.PerspectiveCamera(33.04, sizes.width / sizes.height, 0.1, 100)
window.camera.position.set(0.019, 0.739, -2.93);
window.scene.add(window.camera)
window.camera.rotation.set(-3.09, 0.006, 3.14);

// Controls
const controls = new OrbitControls(window.camera, canvas)
controls.enableDamping = true
controls.enabled = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000);


/**
 * Post Processing
 */
 const renderScene = new RenderPass( window.scene, window.camera );
 const bloomPass = new UnrealBloomPass( new THREE.Vector2( sizes.width, sizes.height ), 1.5, 0.4, 0.85 );
 bloomPass.threshold = 0.1;
 bloomPass.strength = 1.2;
 bloomPass.radius = 1;
 
 const composer = new EffectComposer( renderer );
 composer.addPass( renderScene );
 composer.addPass( bloomPass );

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    runLoader();

    // Update controls
    // controls.update();

    // Render
    renderer.render(window.scene, window.camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    composer.render();
}

tick()