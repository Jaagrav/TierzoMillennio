import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

window.lamborghiniLoop = () => {
    setTimeout(() => {
        window.scene.add(window.lamborghiniBox)
        if(window.innerWidth > 600)
            gsap.to(window.lamborghiniBox.position, {
                duration: 4,
                z: 0,
            })
        else
            gsap.to(window.lamborghiniBox.position, {
                duration: 5,
                y: -0.4,
                z: 3,
            })
    }, 2200);
}

const gltfLoader = new GLTFLoader(); 
let addedLoadTotal = false;

window.lamborghiniBox = new THREE.Group();
gltfLoader.load("./models/car/lambo.gltf", gltf => {
    window.lamborghini = gltf.scene;
    window.camera.rotation.x = -3.09;
    window.lamborghiniBox.position.z = -2.5;
    // window.camera = window.lamborghini.children[7];
    window.lamborghiniBox.add(window.lamborghini);
}, snap => {
    window.loaded += snap.loaded - window.loaded;
    if(!addedLoadTotal){
        addedLoadTotal = true;
        window.totalLoaded += snap.total;
    }
})

const parallax = (e) => {
    const paraE = {
        x: (e.clientX/window.innerWidth - 0.5) * 0.125,
        y: -(1 - (e.clientY/window.innerHeight)) * 0.125,
    }
    if(window.lamborghini) {
        gsap.to(
            window.lamborghini.rotation,
            {
                x: paraE.y,
                y: -paraE.x,
                z: -paraE.x
            }
        )
    }
}

window.addEventListener('mousemove', e => {
    parallax(e);
})
window.addEventListener('touchmove', e => {
    parallax({
        clientX: e.changedTouches[0].clientX,
        clientY: e.changedTouches[0].clientY
    });
})

