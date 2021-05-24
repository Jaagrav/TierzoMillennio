import barba from '@barba/core';
import gsap from 'gsap';

let moveToSlide = 1, currentSlide = 1;

const bodyAnimation = () => {
    
}

const pageTransition = () => {
    console.log("Page Transition")
}

window.html_animations = () => {
    barba.init({
    sync: true,
  
    transitions: [{
        leave(data) {
            pageTransition();
        },
  
        enter(data) {
            console.log("Animate text...");
            bodyAnimation();
        },
  
        once(data) {
            console.log("Animate text...");
            loadHeader();
            loadSlide1();
        },
      }],
  })
};

document.querySelector(".learn-more").addEventListener('click', () => {
    unloadSlide1();
    loadSlide2();
    moveToSlide = 2;
})

function loadHeader() {
    let tl = gsap.timeline();
    tl.from(".logo", { duration: 0.8, scale: 0, opacity: 0 });
    tl.from(".h6.pressable", { duration: 0.8, translateY: 40, opacity: 0 });
}

function loadSlide1() {
    let tl = gsap.timeline();
    tl.to(".hero-section .red-text", { duration: 0.8, translateY: 0, opacity: 1, rotate: 0 });
    tl.to(".hero-section .h1", { duration: 0.8, translateY: 0, opacity: 1, rotate: 0 });
    tl.to(".hero-section .gutterTop", { duration: 0.8, translateY: 0, opacity: 1, rotate: 0 });
    currentSlide = 1;
}

function unloadSlide1() {
    let tl = gsap.timeline();
    tl.to(".hero-section .red-text", { duration: 0.8, translateY: -50, opacity: 0, rotate: 5 });
    tl.to(".hero-section .h1", { duration: 0.8, translateY: -50, opacity: 0, rotate: 5 });
    tl.to(".hero-section .gutterTop", { duration: 0.8, translateY: -50, opacity: 0, rotate: 5 });
    currentSlide = 1;
}

function loadSlide2() {
    let tl = gsap.timeline();
    gsap.to(window.lamborghiniBox.position, { 
        duration: 4,
        x: -1,
        y: 0.7,
        z: 0,
    })
    gsap.to(window.lamborghiniBox.rotation, { 
        duration: 4,
        x: -0.5,
        y: -Math.PI * 1.3
    })
    tl.to(".discover-section .red-text", { duration: 0.8, translateY: 0, opacity: 1, rotate: 0 });
    tl.to(".discover-section .h1", { duration: 0.8, translateY: 0, opacity: 1, rotate: 0 });
    tl.to(".discover-section .h6", { duration: 0.8, translateY: 0, opacity: 1, rotate: 0 });
    tl.to(".discover-section .gutterTop", { duration: 0.8, translateY: 0, opacity: 1, rotate: 0 });
    currentSlide = 2;
}

function unloadSlide2() {
    let tl = gsap.timeline();
    gsap.to(window.lamborghiniBox.position, { 
        duration: 4,
        x: 0,
        y: 0,
        z: 0,
    })
    gsap.to(window.lamborghiniBox.rotation, { 
        duration: 4,
        x: 0,
        y: 0
    })
    tl.to(".discover-section .red-text", { duration: 0.8, translateY: 50, opacity: 0, rotate: 5 });
    tl.to(".discover-section .h1", { duration: 0.8, translateY: 50, opacity: 0, rotate: 5 });
    tl.to(".discover-section .h6", { duration: 0.8, translateY: 50, opacity: 0, rotate: 5 });
    tl.to(".discover-section .gutterTop", { duration: 0.8, translateY: 50, opacity: 0, rotate: 5 });
    currentSlide = 2;
}



window.addEventListener('wheel', e => {
    console.log(moveToSlide)
    if(moveToSlide === currentSlide) {
        if(e.wheelDeltaY < 0) 
            moveToSlide++;
        else if(e.wheelDeltaY > 0)
            moveToSlide--;

        if(moveToSlide > 2) moveToSlide = 2;
        if(moveToSlide < 1) moveToSlide = 1;
        
        switch(moveToSlide) {
            case 1:
                if(moveToSlide !== currentSlide) {
                    unloadSlide2();
                    setTimeout(loadSlide1, 1000);
                }
                else
                    loadSlide1();
                break;

            case 2:
                if(moveToSlide !== currentSlide) {
                    unloadSlide1();
                    setTimeout(loadSlide2, 1000);
                }
                else
                    loadSlide2();
                break;

        }
    }

})