import { timelineInfo } from "./assets/js/data.js";
// import Particle from './assets/js/particle.js';
import BatteryEvents from './assets/js/events.js';
gsap.registerPlugin(ScrollTrigger);


/*  ==============================================================================

                                SELECTORS

==============================================================================  */

const body = document.querySelector('body');
const navbar = document.querySelector('.luna9');
const timelineContainer = document.querySelector(".battery-timeline");
const howTheyWorkDiagram = document.querySelector('.how-they-work__diagram');
const batteryIssuesDiagram = document.querySelector('.current-issues__diagram-img');

/*  ==============================================================================

                                FUNCTIONALITY

==============================================================================  */

let bodyHeight = body.offsetHeight;

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

timelineInfo.map(el => {
    let batteryEvent = new BatteryEvents(el);
    timelineContainer.innerHTML += batteryEvent.renderEvent();
});

timelineInfo.forEach(el => {
    let btnRef = document.querySelector(`.btn--${el.id}`);
    let infoToDisplay = document.querySelector(`.additional-info--${el.id}`);
    btnRef.addEventListener('click', () => {
        document.querySelector(`.additional-info--${el.id}`).classList.toggle('active');
        infoToDisplay.classList.contains("active") ? btnRef.innerText = "Close" : btnRef.innerText = "Learn More";
    })
})

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

/* ====  Navbar ==== */

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
        scrub: true
    }
})

/*
* SECTION - Hero 
*/

let heroTimeline = gsap.timeline();
heroTimeline.from('.topic-header', {
    y: 500,
    duration: 1,
    height: 500 
}).to('.mask', {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
});

/*
* SECTION - How Batteries Work? 
*/

let htwTl = gsap.timeline();
htwTl.to('.how-they-work__summary', {
    autoAlpha: 1,
    duration: 1,
    scrollTrigger: {
        trigger: '.how-they-work__summary',
        start: 'top bottom',
        scrub: true
    }
});
// }).to('.atom', {
//     x: generateRandomNumberWithinRange(750, 830) + "px",
//     stagger: 0.2,
//     duration: 1,
//     scrollTrigger: {
//         trigger: '.how-they-work',
//         start: "top top", 
//         end: "+=4000px",
//         pin: true,
//         duration: 5,
//         scrub: true
//     }
// });


// const moveAtoms = (atomsArr) => {
//     atomsArr.forEach(atom => {
//         cathodeToAnodeTl.to(atom, {
//             x: generateRandomNumberWithinRange(750, 830) + "px",
//             stagger: 0.2,
//             duration: 1
//         })
//     })
// }


let atoms = gsap.utils.toArray('.atom');
let cathodeToAnodeTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.how-they-work',
        start: "top top",
        end: "+=4000px",
        pin: true,
        duration: 5,
        scrub: true,
    }
})

atoms.forEach(atom => {
    cathodeToAnodeTl.to(atom, {
        x: generateRandomNumberWithinRange(750, 830) + "px",
        stagger: 0.2,
        duration: 1
    })
})


/* 
* SECTION - Journey So Far 
*/

let jsfEvents = gsap.utils.toArray('.battery-timeline__event');
jsfEvents.forEach(jsfEvent => {
    gsap.to(jsfEvent, {
        autoAlpha: 1,
        scrollTrigger: {
            trigger: jsfEvent,
            start: "top bottom",
            scrub: true
        }
    });
});

// jsfEvents.forEach(tlEvent => {
//     let jsfTl = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.battery-timeline__event',
//             start: 'top top',
//             markers: true,
//             scrub: true
//         }
//     });
//     jsfTl.staggerTo(tlEvent, 0.5, {
//         autoAlpha: 1,
//     })
// })

/* 
* SECTION - Current Issues 
*/


let batteryIssuesMask = gsap.utils.toArray('.issue-mask');
let batteryIssuesContent = gsap.utils.toArray('.current-issues__issue-content');

let batteryIssuesTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.current-issues__diagram',
        start: "top 25%",
        end: `+=${3000}px`,
        markers: true,
        pin: true,
        scrub: true,
        onEnter: (e) => {
            console.log(e)
            triggerIssueAnimation(batteryIssuesMask, batteryIssuesContent);
        }
    }
})

const triggerIssueAnimation = (issuesArr, contentArr) => {
    console.log("trigger ran");
    issuesArr.forEach(issue => {
        batteryIssuesTl.to(issue, {
            backgroundColor: "transparent",
            stagger: 1,
        })
    })
    contentArr.forEach(issue => {
        batteryIssuesTl.to(issue, {
            autoAlpha: 1,
        }, '+=100%')
    })
}

// batteryIssues.forEach(issue => {
//     gsap.to(issue, {
//         backgroundColor: "transparent",
//         scrollTrigger: {
//             trigger: 'issue',
//             markers: true,
//             start: "top top",
//             scrub: true,
//             pin: true,
//         }
//     })
// })



// gsap.set(batteryIssues, { backgroundColor: '#FFF501' });
// console.log(batteryIssues);

// batteryIssues.forEach(battery => {
//     let batteryIssueTl = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.current-issues__diagram',
//             start: "center top",
//             pin: true,
//             scrub: true,
//         }
//     })
//     batteryIssueTl.to(battery, {
//         backgroundColor: "transparent",
//     })
// })

/*
* SECTION - Innovative Solutions 
*/

let isTl = gsap.timeline();
isTl.to('.solutions-header', {
    autoAlpha: 1,
    duration: 1,
    scrollTrigger: {
        trigger: '.current-issues',
        start: "bottom 60%",
        markers: true,
        scrub: true
    }
})

/* ====  Contact ==== */

















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


// .to('.topic-header', {
//     stagger: 1,
//     duration: 1,
//     delay: 0.5,
//     onEnter: {
//         toggleClass: 'active',
//     },
//     backgroundColor: "transparent",
// })



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