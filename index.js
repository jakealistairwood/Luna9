import { timelineInfo } from "./assets/js/data.js";
// import Particle from './assets/js/particle.js';
import BatteryEvents from './assets/js/events.js';
gsap.registerPlugin(ScrollTrigger);


/*  ==============================================================================

                                SELECTORS

==============================================================================  */

const body = document.querySelector('body');
const timelineContainer = document.querySelector(".battery-timeline");
const howTheyWorkDiagram = document.querySelector('.how-they-work__diagram');
const jsfContainer = document.querySelector('.battery-timeline-container');
const batteryIssuesDiagram = document.querySelector('.current-issues__diagram-img');
const timelineSVG = document.querySelector('.timeline-svg');
const sourcesBtn = document.querySelector('.footer__btn');

/*  ==============================================================================

                                FUNCTIONALITY

==============================================================================  */

let bodyHeight = body.offsetHeight;
let bodyScrollHeight = body.scrollHeight;

console.log(bodyHeight, bodyScrollHeight);

let isMobileDevice = window.matchMedia('(max-width: 500px)');
let isNotMobileDevice = window.matchMedia('(min-width: 501px)');

let atomNodesArr = [];

const toggleSourcesDropdown = () => {
    document.querySelector('.footer__sources').classList.toggle('active');
    if(document.querySelector('.footer__sources').classList.contains('active')) {
        document.querySelector('.footer__arrow-icon').style.transform = 'rotate(180deg)';
    } else {
        document.querySelector('.footer__arrow-icon').style.transform = 'rotate(0deg)';
    }
};

const generateRandomNumberWithinRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const createAtom = (atomOptions, isMob) => {
    const { id, particleType, atomSize, imgOptions, coordinates } = atomOptions;
    let atom = document.createElement('img');
    let classesToAdd = ["atom", `${particleType}--${id}`];
    classesToAdd.forEach(clName => atom.classList.add(clName));
    atom.src = imgOptions.src;
    atom.alt = imgOptions.alt;
    atom.style.width = `${atomSize} px`;
    atom.style.height =`${atomSize} px`;

    if(isMob.matches) {
        atom.style.left = generateRandomNumberWithinRange(coordinates.mobile.xMin, coordinates.mobile.xMax) + "px";
        atom.style.top = generateRandomNumberWithinRange(coordinates.mobile.yMin, coordinates.mobile.yMax) + "px";
    } else {
        atom.style.left = generateRandomNumberWithinRange(coordinates.desktop.xMin, coordinates.desktop.xMax) + "px"; 
        atom.style.top = generateRandomNumberWithinRange(coordinates.desktop.yMin, coordinates.desktop.yMax) + "px";
    }
    atomNodesArr.push({
        id: id,
        x: atom.style.left
    });
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
            mobile: {
                xMin: 20,
                xMax: 100,
                yMin: 20,
                yMax: 88
            },
            desktop: {
                xMin: 70,
                xMax: 350,
                yMin: 70,
                yMax: 300
            }
        }
    }, isMobileDevice))
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


/* Timeline SVG */
let htwDiagramDocHeight = window.pageYOffset + howTheyWorkDiagram.getBoundingClientRect().top;
let jsfContainerBottomPos = window.pageYOffset + jsfContainer.getBoundingClientRect().bottom;
console.log(htwDiagramDocHeight);
timelineSVG.style.position = "absolute";
timelineSVG.style.top = htwDiagramDocHeight;
timelineSVG.style.bottom - jsfContainerBottomPos;


sourcesBtn.addEventListener('click', toggleSourcesDropdown);




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

let mq = gsap.matchMedia();

/* ====  Navbar ==== */

let navTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: 'body',
        start: "top top",
        toggleClass: { targets: '.luna9', className: 'active'}
    }
});

navTimeline.to('.navbar__progress-indicator', {
    width: 38,
    fill: 'green',
    scrollTrigger: {
        trigger: 'body',
        start: "top 1%",
        end: `+=45916`,
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
let atoms = gsap.utils.toArray('.atom');

htwTl.to('.how-they-work__summary', {
    autoAlpha: 1,
    duration: 1,
    scrollTrigger: {
        trigger: '.how-they-work__summary',
        start: 'top bottom',
        scrub: true
    }
});


const getStartingXPos = (el) => {
    let elID = Number(el.classList[1].toString().substring(5, 7));
    let atomInQuestion = atomNodesArr.filter(atom => atom.id == elID);
    return atomInQuestion[0].x;
} 


mq.add({
    isMobile: "(max-width: 500px)",
    isDesktop: "(min-width: 501px)",
}, (context) => {
    let { isMobile, isDesktop } = context.conditions;
    let htwDiagramTl = gsap.timeline({
        scrollTrigger: {
            trigger: isDesktop ? '.how-they-work' : '.how-they-work',
            start: isDesktop ? 'top top' : 'center center',
            end: isDesktop ? '+=20000px' : '+=10000px',
            pin: true,
            // markers: true,
            scrub: true,
            pinSpacing: true
        }
    })
    htwDiagramTl.to('.point--one', {
        autoAlpha: 1
    })
    atoms.forEach(atom => {
        htwDiagramTl.to(atom, {
            // x: isDesktop ? generateRandomNumberWithinRange(750, 830) + 'px' : isMobile ? generateRandomNumberWithinRange(0, 10) + 'px' : 0,
            x: isMobile ? generateRandomNumberWithinRange(210, 230) + 'px' : generateRandomNumberWithinRange(750, 830) + "px",
            stagger: 0.2
        }, '>-80%')
    })
    htwDiagramTl.to('.point--one', {
        autoAlpha: 0
    })
    htwDiagramTl.to('.point--two', {
        autoAlpha: 1
    })
    atoms.forEach(atom => {
        htwDiagramTl.to(atom, {
            // x: getStartingXPos(atom),
            x: 0
        }, '>-80%')
    })
})






// mq.add("(min-width: 501px)", () => {
//     let htwDiagramTl = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.how-they-work',
//             start: 'top top',
//             end: '+=20000px',
//             pin: true,
//             scrub: true
//         }
//     })
    
//     htwDiagramTl.to('.point--one', {
//         autoAlpha: 1
//     })
    
//     atoms.forEach(atom => {
//         htwDiagramTl.to(atom, {
//             x: generateRandomNumberWithinRange(750, 830) + 'px',
//             stagger: 0.2
//         }, '>-80%')
//     })
    
//     htwDiagramTl.to('.point--one', {
//         autoAlpha: 0
//     })
    
//     htwDiagramTl.to('.point--two', {
//         autoAlpha: 1
//     })
    
//     atoms.forEach(atom => {
//         htwDiagramTl.to(atom, {
//             // x: getStartingXPos(atom),
//             x: 0
//         }, '>-80%')
//     })
// })

// mq.add("(max-width: 500px)", () => {
//     let htwDiagramTl = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.how-they-work',
//             start: "top top",
//             end: '+=40vh',
//             markers: true
//         }
//     })
//     htwDiagramTl.to('.point--one', {
//         autoAlpha: 1
//     })
//     atoms.forEach(atom => {
//         htwDiagramTl.to(atom, {
//             x: generateRandomNumberWithinRange(50, 100) + "px",
//             stagger: 0.2
//         }, '>-80%')
//     })
// })








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




mq.add({
    isMobile: "(max-width: 500px)",
    isDesktop: "(min-width: 501px)",
}, (context) => {
    let { isMobile, isDesktop } = context.conditions;
    let batteryIssuesTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.current-issues__diagram',
            start: "top 10%",
            end: isDesktop ? "+=15000px" : "",
            pin: isDesktop ? true : false,
            scrub: isDesktop ? true : false
        }
    })
    batteryIssuesTl.to('.current__issues-header', {
        autoAlpha: isDesktop ? 0 : 1
    })
    batteryIssuesMask.forEach(mask => {
        batteryIssuesTl.to(mask, {
            backgroundColor: 'transparent',
        })
    })
    batteryIssuesContent.forEach(content => {
        batteryIssuesTl.to(content, {
            autoAlpha: 1
        }, ">-10%")
    })
})


const triggerIssueAnimation = (issuesArr, contentArr) => {
    batteryIssuesTl.to('.current-issues-header', {
        autoAlpha: 0,
        duration: 1,
    });

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
    }, ">-100%")
}

// batteryIssues.forEach(issue => {
//     gsap.to(issue, {
//         backgroundColor: "transparent",
//         scrollTrigger: {
//             trigger: 'issue',       
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
let inSolutions = gsap.utils.toArray('.innovative-solutions__solution');

isTl.to('.solutions-header', {
    autoAlpha: 1,
    duration: 1,
    scrollTrigger: {
        trigger: '.current-issues',
        start: "bottom 60%",
        scrub: true
    }
})

inSolutions.forEach(solution => {
    isTl.to(solution, {
        autoAlpha: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: solution,
            start: "top bottom",
            scrub: true
        }
    })
})

/*
* SECTION: CONTACT
*/

mq.add({
    isMobile: "(max-width: 500px)",
    isDesktop: "(min-width: 501px)",
}, (context) => {
    let { isMobile, isDesktop } = context.conditions;

    if(isDesktop) {
        let contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.contact',
                start: "center bottom",
                end: "bottom center",
                scrub: true,
            }
        })
        contactTl.from('.contact__img', {
            x: 200
        }).from('.contact__img-spring', {
            x: -200
        }, '<').to('.contact__content', {
            autoAlpha: 1,
            duration: 1
        })
    }
})
