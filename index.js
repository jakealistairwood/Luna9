import { timelineInfo } from "./assets/js/data.js";
gsap.registerPlugin(ScrollTrigger);

/*  ==============================================================================

                                SELECTORS

==============================================================================  */

const body = document.querySelector('body');
const timelineContainer = document.querySelector(".battery-timeline");
const howTheyWorkDiagram = document.querySelector('.how-they-work__diagram');
const batteryIssuesDiagram = document.querySelector('.current-issues__diagram-img');
const particleBox = document.querySelector('.particle-box__container');


let bodyHeight = body.offsetHeight;

let currentViewport = {
    height: window.innerHeight,
    width: window.innerWidth
};

particleBox.style.width = currentViewport.width + 'px';
particleBox.style.height = currentViewport.height + 'px';

/*  ==============================================================================

                                FUNCTIONALITY

==============================================================================  */

const toggleDropdown = (eventName) => console.log(eventName);
// const toggleDropdown = (eventName) => document.querySelector(`.additional-info--${eventName}`).classList.toggle("active");

const renderTimelineEvent = (el) => {
		let eventHTML = `<div class="battery-timeline__event">
            <div class="battery-timeline__img-container">
                <img src="${el.imgInfo.src}" alt="${el.imgInfo.alt}" />
            </div>
            <div class="battery-timeline__info">
                <div class="battery-timeline__date">
                    ${Array.from(String(el.date)).map(char => {
                        return `<span>${char}</span>`
                    }).join("")}
                </div>
                <h3>${el.title}</h3>
                <ul>
                    <li>Name:<strong>${el.name}</strong></li>
                    <li>Invented by:<strong>${el.inventedBy}</strong></li>
                    <li>In:<strong>${el.location}</strong></li>
                    <li>Voltage:<strong>${el.voltageOutput}</strong></li>
                </ul>
                <button class="battery-timeline__btn">Learn More</button>
                <div class="battery-timeline__additional-info additional-info--${el.name}">
                    <p>${el.additionalInfo}</p>
                </div>
            </div>
        </div>`;
        return eventHTML;
};

const generateRandomNumberWithinRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const createAtom = (atomOptions) => {
    const { id, particleType, atomSize, imgOptions, coordinates } = atomOptions;
    let atom = document.createElement('img');
    let classesToAdd = ["atom", `${particleType}--${id}`];
    classesToAdd.forEach(clName => {
        atom.classList.add(clName);
    })
    atom.src = imgOptions.src;
    atom.alt = imgOptions.alt;
    atom.style.width = `${atomSize} px`;
    atom.style.height =`${atomSize} px`;
    atom.style.left = generateRandomNumberWithinRange(coordinates.xMin, coordinates.xMax) + "px";
    atom.style.top = generateRandomNumberWithinRange(coordinates.yMin, coordinates.yMax) + "px";
    return atom;
}

for(let i = 0; i < generateRandomNumberWithinRange(7, 20); i++) {
    particleBox.appendChild(createAtom({
        id: i++,
        particleType: 'particle',
        atomSize: 50,
        imgOptions: {
            src: "./assets/img/grey-particle.svg",
            alt: 'grey-gradient-sphere-depicting-atom'
        },
        coordinates: {
            xMin: 0,
            xMax: currentViewport.width,
            yMin: 0,
            yMax: currentViewport.height
        }
    }));
}

for(let i = 0; i < generateRandomNumberWithinRange(30, 200); i++) {
    howTheyWorkDiagram.appendChild(createAtom({
        id: i++,
        particleType: "ion",
        atomSize: 20,
        imgOptions: {
            src: './assets/img/cyan-particle.svg',
            alt: 'turquoise-gradient-sphere-depicting-atom'
        },
        coordinates: {
            xMin: 70,
            xMax: 350,
            yMin: 70,
            yMax: 300
        }
    }))
}

// renderTimelineEvents(timelineInfo);
timelineContainer.innerHTML += timelineInfo.map(el => renderTimelineEvent(el)).join("");


/*  ==============================================================================

                           GSAP / SCROLL ANIMATIONS

==============================================================================  */

/*
== Elements to animate:
    1. Activate Navbar when viewport height reaches a certain position
    2. Fill battery in accordance to body height
    3. Animate in hero section on page load
    4. 
*/

let navTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: 'body',
        start: "top top",
        toggleClass: { targets: '.luna9', className: 'active'}
    }
});



navTimeline.to('.luna9__progress-indicator', {
    width: 96,
    scrollTrigger: {
        trigger: 'body',
        start: "top 1%",
        end: `+=${bodyHeight + 4000}`,
        markers: true,
        scrub: true
    }
})



















// ScrollTrigger.create({
//     start: "top top",
//     // end: `+=${bodyHeight}px`,
//     markers: true,
//     trigger: ".luna9",
//     toggleClass: { targets: ".luna9", className: "active"}
// });



// tl.to('.luna9__progress-indicator', {
//     width: 96,
//     backgroundColor: 'green',
//     scrollTrigger: {
//         trigger: 'body',
//         start: "top 1%",
//         scrub: 1,
//     }
// }).from('.topic', {
//     stagger: 1,
//     duration: 1,
//     ease: "power3.out",
//     y: -100,
//     opacity: 0
// });

/* HERO/OVERVIEW SECTION */
let heroTimeline = gsap.timeline();
heroTimeline.from('.topic-header', {
    y: 500,
    duration: 1,
    height: 500 
}).to('.mask', {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
});

// .to('.topic-header', {
//     stagger: 1,
//     duration: 1,
//     delay: 0.5,
//     onEnter: {
//         toggleClass: 'active',
//     },
//     backgroundColor: "transparent",
// })

let howTheyWorkTimeline = gsap.timeline();
howTheyWorkTimeline.to('.how-they-work__summary', {
    autoAlpha: 1,
    duration: 1,
    scrollTrigger: {
        trigger: '.how-they-work__summary',
        start: 'top bottom',
        scrub: true
    }
}).to('.atom', {
    x: generateRandomNumberWithinRange(750, 830) + "px",
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
        trigger: '.how-they-work',
        start: "top top", 
        end: "+=4000px",
        pin: true,
        duration: 5,
        scrub: true
    }
});


let batteryIssues = gsap.utils.toArray('.issue-mask');
gsap.set(batteryIssues, { backgroundColor: '#FFF501' });
console.log(batteryIssues);

batteryIssues.forEach(battery => {
    let batteryIssueTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.current-issues__diagram',
            start: "center top",
            pin: true,
            scrub: true,
            markers: true,
        }
    })
    batteryIssueTl.to(battery, {
        backgroundColor: "transparent",
    })
})





// let batteryIssuesTimeline = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.current-issues__diagram',
//         start: "top top",
//         end: "+=5000px",
//         markers: true,
//         pin: true,
//         pinSpacing: true,
//         scrub: true
//     }
// })

// let innovativeSolutionsTimeline = gsap.timeline();
// batteryIssuesTimeline.to('.solutions-header', {
//     autoAlpha: 1,
//     duration: 1,
//     scrollTrigger: {
//         trigger: '.solutions-header',
//         start: "top bottom",
//         scrub: true
//     }
// }).to('.current-issues__issue', {
//     scrollTrigger: {
//         trigger: '.current-issues__diagram',
//         start: 'top top',
//         end: "+=5000px",
//         markers: true,
//         pin: true,
//         pinSpacing: true
//     }
// });
// .to('.atom', {
//     stagger: 0.2,
//     duration: 1,
//     x: generateRandomNumberWithinRange(700, 900) + 'px',
//     scrollTrigger: {
//         trigger: '.how-they-work',
//         start: "top top",
//         end: "top top",
//         pin: true,
//         markers: true,
//     }
// })