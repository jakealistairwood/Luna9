import { timelineInfo } from './assets/js/data.js';

gsap.registerPlugin(ScrollTrigger);
let tl = gsap.timeline();

// Elements
const batteryTimeline = document.querySelector('.battery-timeline');

const renderBatteries = (array) => {

}

// tl.to('.luna9__progress-indicator', {
//     width: 96,
//     backgroundColor: 'green',
//     scrollTrigger: {
//         trigger: 'body',
//         start: "top 1%",
//         scrub: 5,
//     }
// }).from('.topic', {
//     stagger: 1,
//     duration: 1,
//     ease: "power3.out",
//     y: -100,
//     opacity: 0
// })


tl.to('h1', {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    scrollTrigger: {
        trigger: '.overview',
        pin: true,
        start: "top top",
        markers: true
    }
})