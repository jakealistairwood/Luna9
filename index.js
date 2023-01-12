import { timelineInfo } from "./assets/js/data.js";
import BatteryEvents from './assets/js/events.js';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, DrawSVGPlugin, ScrollToPlugin, MorphSVGPlugin, MotionPathPlugin);


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

let isMobileDevice = window.matchMedia('(max-width: 500px)');
let isTabletDevice = window.matchMedia('(min-width: 501px) and (max-width: 1279px');
let isSmDesktopDevice = window.matchMedia('(min-width: 1280px) and (max-width: 1440px)');
let isNotMobileDevice = window.matchMedia('(min-width: 501px)');

let atomNodesArr = [];
let sectionAnchorClicked = false;

let disabled = false;

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

ScrollSmoother.create({
    smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true,           // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    normalizeScroll: false
  });

/* ====  Navbar ==== */

let navTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: 'body',
        start: "top top",
        toggleClass: { targets: '.luna9', className: 'active'},
    }
});


// let sectionAnchors = document.querySelectorAll('.section-anchor');

// sectionAnchors.forEach(anchor => {
//     anchor.addEventListener('click', e => {
//         e.preventDefault();
//         console.log(anchor);
//         sectionAnchorClicked = true;

//         if(sectionAnchorClicked) {
//             ScrollTrigger.getById('htwDiagramTl').disable();
//             ScrollTrigger.getById('currentIssuesTl').disable();
//         }



//         let scrollToThisSection = anchor.getAttribute('href');
//         gsap.to(window, { ease: "power3.inOut", scrollTo: scrollToThisSection })

//         ScrollTrigger.getById('htwDiagramTl').enable();
//         ScrollTrigger.getById('currentIssuesTl').enable();
//         sectionAnchorClicked = false;
//     })
// })


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

mq.add({
    isMobile: "(max-width: 500px)",
    isTablet: "(min-width: 501px) and (max-width: 1279px)", 
    isSmDesktop: "(min-width: 1280px) and (max-width: 1440px)",
    isMobileLandscape: "(orientation: landscape) and (min-device-width: 300px) and (max-device-width: 1000px)",
    isDesktop: "(min-width: 1441px)",
}, (context) => {
    let { isMobile, isSmDesktop, isTablet, isDesktop, isMobileLandscape } = context.conditions;
    navTimeline.to('.navbar__progress-indicator', {
        width: 38,
        fill: '#000',
        scrollTrigger: {
            trigger: 'body',
            start: "top 1%",
            end: isDesktop ? "+=37916" 
            : isSmDesktop ? "+=45000"
            : isTablet ? "+=50000"
            : isMobileLandscape ? "+=35000"
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
    isMobileLandscape: "(orientation: landscape) and (min-device-width: 300px) and (max-device-width: 900px)"
}, (context) => {
    let { isMobile, isSmDesktop, isTablet, isDesktop, isMobileLandscape } = context.conditions;
    let htwDiagramTl = gsap.timeline({
        scrollTrigger: {
            trigger: isDesktop 
            ? '.how-they-work' 
            : isMobileLandscape ? '.how-they-work__diagram'
            : '.how-they-work',
            start: isDesktop 
            ? 'top top'
            : isMobileLandscape ? 'top center'
            : 'center center',
            end: isDesktop ? '+=10000px' : '+=10000px',
            pin: true,
            scrub: true,
            pinSpacing: true,
            id: "htwDiagramTl",
            onUpdate: killWhenFast
            // onEnter: (self) => {
            //     console.log(self);
            //     if(sectionAnchorClicked) {
            //         self.disable(true, true);
            //         self.animation.progress(1);
            //     } else {
            //         self.enable();
            //     }
            // },
            // onLeave: (self) => {
            //     if()
            // }
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
            scrub: isDesktop ? true : false,
            id: 'currentIssuesTl',
            onUpdate: checkDisabled
        }
    })

    gsap.utils.toArray('.current-issues__issue').forEach((issue, i) => {
        let issueMask = issue.querySelector('.issue-mask'),
        issueContent = issue.querySelector('.current-issues__issue-content');
        
        issTl.to(issueMask, {
            backgroundColor: 'transparent'
        }).to(issueContent, {
            autoAlpha: 1
        }, '<')
    })
})

// mq.add({
//     isMobile: "(max-width: 500px)",
//     isLgDesktop: "(min-width: 1440px)"
// }, (context) => {
//     let { isMobile, isLgDesktop } = context.conditions;

//     if(isMobile) {
//         let timelineDrawTl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: '.battery-timeline-container',
//                 start: "top bottom", 
//                 end: "bottom bottom",
//                 markers: true,
//                 scrub: true
//             }
//         })
//         timelineDrawTl.from('.st1', {
//             drawSVG: 0
//         })
//     } else {
//         let timelineDrawTl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: '.battery-timeline-container',
//                 start: "20% top",
//                 end: "+=8000",
//                 scrub: true,
//                 markers: true
//             }
//         })
        
//         timelineDrawTl.from('.st0', {
//             drawSVG: 0
//         })
//     }

// })

mq.add({
    isMobile: "(max-width: 500px)",
    isTablet: "(min-width: 501px) and (max-width: 1279px)",
    isDesktop: "(min-width: 1280px)",
}, (context) => {
    let { isMobile, isTablet, isDesktop } = context.conditions;

    if(isDesktop) {
        let timelineDrawTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.battery-timeline-container',
                start: "top top",
                end: "+=8200",
                scrub: true,
                // onUpdate: (this) => {
                //     let currentProgress = this.progress();
                //     checkTimelineProgress(currentProgress);
                //     console.log(currentProgress);
                //     // if(currentProgress = 0.5640248) {
        
                //     // }
                // }
            }
        }).from(".st0", {
            drawSVG: 0
        })
    } 
    // else if(isMobile) {
    //     let timelineDrawTl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: '.battery-timeline-container',
    //             start: 'top top',
    //             end: "+=6000",
    //             scrub: true
    //         }
    //     }).from('.st1', {
    //         drawSVG: 0
    //     })
    // }
})

// let timelineDrawTl = gsap.timeline({
//     scrollTrigger: {
//         trigger: '.battery-timeline-container',
//         start: "top top",
//         end: "+=8200",
//         scrub: true,
//         // onUpdate: (this) => {
//         //     let currentProgress = this.progress();
//         //     checkTimelineProgress(currentProgress);
//         //     console.log(currentProgress);
//         //     // if(currentProgress = 0.5640248) {

//         //     // }
//         // }
//     }
// }).from(".st0", {
//     drawSVG: 0
// })
// timelineDrawTl.to('.timeline-tracker', {
//     motionPath: {
//         path: MorphSVGPlugin.convertToPath(".st0"),
//         align: MorphSVGPlugin.convertToPath(".st0"),
//         allowOrigin: [0.5, 0.5],
//     }
// })  
// timelineDrawTl.from('.st0', {
//     drawSVG: 0
// });

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



// let sectionAnchors = document.querySelectorAll('.section-anchor');

// sectionAnchors.forEach(anchor => {
//     anchor.addEventListener('click', e => {
//         e.preventDefault();
//         console.log(anchor);
//         sectionAnchorClicked = true;

//         if(sectionAnchorClicked) {
//             ScrollTrigger.getById('htwDiagramTl').disable();
//             ScrollTrigger.getById('currentIssuesTl').disable();
//         }



//         let scrollToThisSection = anchor.getAttribute('href');
//         gsap.to(window, { ease: "power3.inOut", scrollTo: scrollToThisSection })

//         ScrollTrigger.getById('htwDiagramTl').enable();
//         ScrollTrigger.getById('currentIssuesTl').enable();
//         sectionAnchorClicked = false;
//     })
// })

gsap.utils.toArray('.section-anchor').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        console.log(disabled);
        e.preventDefault();
        gsap.to(window, {
            onStart: () => disabled = true,
            onComplete: () => {
                disabled = false,
                console.log(disabled);
            },    
            onUpdate: () => console.log(disabled),
            scrollTo: e.currentTarget.getAttribute('href')
        })
        console.log(disabled);
    })
})

let sections = gsap.utils.toArray('.section-control')

sections.forEach(section => {
    gsap.to(section, {
        ease: "none",
        scrollTrigger: {
            trigger: section,
            scrub: 1,
            end: () => "+=" + window.innerHeight * sections.length,
            onUpdate: checkDisabled
        }
    })
})

function checkDisabled(self) {
    if(disabled) {
        let tween = self.getTween();
        tween && tween.progress(1);
        self.animation.progress(self.progress === 1 ? 1 : 0);
        console.log("function ran");
    }
}

function killWhenFast(self) {
    let tween = self.getTween();
    tween && Math.abs(self.getVelocity()) > 2500 && tween.progress(1);
}




