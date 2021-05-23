import barba from '@barba/core';
import gsap from 'gsap';

const bodyAnimation = () => {
    var tl = gsap.timeline();
    gsap.to(".loaderTopHalf", { duration: 0.8, top: "-50%",});
    tl.to(".loaderBottomHalf", { duration: 0.8, bottom: "-50%",});
    tl.from(".logo", { duration: 0.8, scale: 0, opacity: 0 });
    tl.from(".h6.pressable", { duration: 0.8, translateY: 50, opacity: 0 });
    tl.from(".hero-section .red-text", { duration: 0.8, translateY: 50, opacity: 0 });
    tl.from(".hero-section .h1", { duration: 0.8, translateY: 50, opacity: 0 });
    tl.from(".hero-section .gutterTop", { duration: 0.8, translateY: 50, opacity: 0 });
}

const pageTransition = () => {
    console.log("Page Transition")
}

window.html_animations = () => {
    barba.init({
    sync: true,
  
    transitions: [{
        name: 'opacity-transition',
        leave(data) {
            pageTransition();
        },
  
        enter(data) {
          console.log("Animate text...");
          bodyAnimation();
        },
  
        once(data) {
            console.log("Animate text...");
            bodyAnimation();
        },
      }],
  })
};