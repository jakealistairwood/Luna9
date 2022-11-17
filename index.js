import { timelineInfo } from "./assets/js/data.js";

// gsap.registerPlugin(ScrollTrigger);
// let tl = gsap.timeline();

// Elements
const timelineContainer = document.querySelector(".battery-timeline");
const howTheyWorkDiagram = document.querySelector('.how-they-work__diagram-img');
const batteryIssuesDiagram = document.querySelector('.current-issues__diagram-img');

console.log(howTheyWorkDiagram);

const renderTimelineEvent = (el) => {
		let eventHTML = `<div class="battery-timeline__event">
            <div class="battery-timeline__img-container">
                <img src="${el.imgInfo.src}" alt="${el.imgInfo.alt}" />
            </div>
            <div class="battery-timeline__info">
                <h4>${el.title}</h4>
                <ul>
                    <li>Name:<strong>${el.name}</strong></li>
                    <li>Invented by:<strong>${el.inventedBy}</strong></li>
                    <li>In:<strong>${el.location}</strong></li>
                    <li>Voltage:<strong>${el.voltageOutput}</strong></li>
                </ul>
            </div>
        </div>`;
        return eventHTML;
};

const generateRandomNumber = (max) => Math.floor(Math.random() * max);

const createAtom = () => {
    let atom = document.createElement('img');
    atom.classList.add('atom'); 
    atom.src = "./img/Cyan_particle-1.svg";
    atom.alt = "sphere-with-turqoise-gradient-depicting-an-atom";
    atom.style.width = '50px';
    atom.style.height = '50px';
    return atom;
}

// renderTimelineEvents(timelineInfo);
timelineContainer.innerHTML += timelineInfo.map(el => renderTimelineEvent(el));

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

// tl.to("h1", {
// 	clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
// 	scrollTrigger: {
// 		trigger: ".overview",
// 		pin: true,
// 		start: "top top",
// 		markers: true,
// 	},
// });
