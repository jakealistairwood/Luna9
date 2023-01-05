import { timelineInfo } from "./assets/js/data.js";
import BatteryEvents from './assets/js/events.js';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin);


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
let isTabletDevice = window.matchMedia('(min-width: 501px) and (max-width: 1279px');
let isSmDesktopDevice = window.matchMedia('(min-width: 1280px) and (max-width: 1440px)');
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

const createAtom = (atomOptions, isMob, isSmDesk, isTablet ) => {
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
    } else if (isSmDesk.matches) {
        atom.style.left = generateRandomNumberWithinRange(coordinates.smDesktop.xMin, coordinates.smDesktop.xMax) + "px";
        atom.style.top = generateRandomNumberWithinRange(coordinates.smDesktop.yMin, coordinates.smDesktop.yMax) + "px";
    } else if (isTablet.matches) {
        atom.style.left = generateRandomNumberWithinRange(coordinates.tablet.xMin, coordinates.tablet.xMax) + "px";
        atom.style.top = generateRandomNumberWithinRange(coordinates.tablet.yMin, coordinates.tablet.yMax) + "px";
    }
    else {
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
            tablet: {
                xMin: 35,
                xMax: 210,
                yMin: 50,
                yMax: 146
            },
            smDesktop: {
                xMin: 55,
                xMax: 330,
                yMin: 50,
                yMax: 175
            },
            desktop: {
                xMin: 70,
                xMax: 350,
                yMin: 70,
                yMax: 300
            }
        }
    }, isMobileDevice, isSmDesktopDevice, isTabletDevice))
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

if(ScrollTrigger.isTouch !== 1) {
    
}

ScrollSmoother.create({
    smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true,           // looks for data-speed and data-lag attributes on elements
    // smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });

/* ====  Navbar ==== */

let navTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: 'body',
        start: "top top",
        toggleClass: { targets: '.luna9', className: 'active'}
    }
});

// navTimeline.to('.navbar__progress-indicator', {
//     width: 38,
//     fill: 'green',
//     scrollTrigger: {
//         trigger: 'body',
//         start: "top 1%",
//         end: `+=45916`,
//         scrub: true
//     }
// })

let bodyH = document.body;
let html = document.documentElement;

let heights = Math.max(bodyH.scrollHeight, bodyH.offsetHeight, html.scrollHeight, html.offsetHeight);
console.log(heights);

mq.add({
    isMobile: "(max-width: 500px)",
    isTablet: "(min-width: 501px) and (max-width: 1279px)", 
    isSmDesktop: "(min-width: 1280px) and (max-width: 1440px)",
    isDesktop: "(min-width: 1441px)",
}, (context) => {
    let { isMobile, isSmDesktop, isTablet, isDesktop } = context.conditions;
    navTimeline.to('.navbar__progress-indicator', {
        width: 38,
        fill: '#000',
        scrollTrigger: {
            trigger: 'body',
            start: "top 1%",
            end: isDesktop ? "+=45916" 
            : isSmDesktop ? "+=45000"
            : isTablet ? "+=50000"
            : "+=26504",
            // end: `+=45916`,
            scrub: true
        }
    })
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

mq.add({
    isMobile: "(max-width: 500px)",
    isTablet: "(min-width: 501px) and (max-width: 1279px)", 
    isSmDesktop: "(min-width: 1280px) and (max-width: 1440px)",
    isDesktop: "(min-width: 1441px)",
}, (context) => {
    let { isMobile, isSmDesktop, isTablet, isDesktop } = context.conditions;
    let htwDiagramTl = gsap.timeline({
        scrollTrigger: {
            trigger: isDesktop ? '.how-they-work' : '.how-they-work',
            start: isDesktop ? 'top top' : 'center center',
            end: isDesktop ? '+=10000px' : '+=10000px',
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
            x: isMobile 
            ? generateRandomNumberWithinRange(210, 230) + 'px' 
            : isSmDesktop ? generateRandomNumberWithinRange(640, 690) + 'px' 
            : isTablet ? generateRandomNumberWithinRange(390, 400) + 'px'
            : generateRandomNumberWithinRange(750, 830) + 'px',
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
            x: 0
        }, '>-80%')
    })
})


// let svgTl = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.how-they-work__diagram',
//         start: "center center",
//         end: "+=10000",
//         markers: true,
//         scrub: 0.5,
//         toggleClass: 'active'
//     }
// })

// svgTl.from('#timeline', {
//     drawSVG: -100
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


/* 
* SECTION - Current Issues 
*/

mq.add({
    isMobile: "(max-width: 500px)",
    isTablet: "(min-width: 501px) and (max-width: 1279px)",
    isDesktop: "(min-width: 1280px)",
}, (context) => {
    
    let { isMobile, isTablet, isDesktop } = context.conditions;

    let issTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.current-issues__diagram',
            start: "top 10%",
            end: isDesktop ? "+=10000px" : "",
            pin: isDesktop ? true : false,
            scrub: isDesktop ? true : false
        }
    })

    gsap.utils.toArray('.current-issues__issue').forEach((issue, i) => {
        let issueMask = issue.querySelector('.issue-mask'),
        issueContent = issue.querySelector('.current-issues__issue-content');
        console.log(issueMask, issueContent);
        
        issTl.to(issueMask, {
            backgroundColor: 'transparent'
        }).to(issueContent, {
            autoAlpha: 1
        }, '<')
    })
})


// let eventTl = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.how-they-work__diagram',
//         start: "top bottom",
//         end: "bottom top",
//         markers: true,
//         scrub: true,
//     }
// }).fromTo("#timeline", {
//     drawSVG: "0% -100%"
// }, {
//     drawSVG: "100% 100%"
// }, 0);




// drawTl.fromTo('#timeline', { drawSVG: 0 }, {
//     drawSVG: 100,
//     ease:"power1.inOut",
//     scrollTrigger: {
//         trigger: '.how-they-work__diagram',
//         start: "top center",
//         end: "+=10000",
//         markers: true,
//         scrub: true
//     }
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
    isTablet: "(min-width: 501px) and (max-width: 1279px)", 
    isSmDesktop: "(min-width: 1280px) and (max-width: 1440px)",
    isDesktop: "(min-width: 1280px)",
}, (context) => {
    let { isMobile, isSmDesktop, isDesktop } = context.conditions;

    if(isDesktop || isSmDesktop) {
        let contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.contact',
                start: "center bottom",
                end: "bottom center",
                scrub: true,
            }
        })
        contactTl.from('.contact__img', {
            x: isDesktop ? 200 : 0
        }).from('.contact__img-spring', {
            x: isDesktop ? -200 : 0
        }, '<').to('.contact__content', {
            autoAlpha: 1,
            duration: 1
        })
    }
})



