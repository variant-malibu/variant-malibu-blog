import gsap, {TimelineMax} from 'gsap'

const fadeIn = element => {
  gsap.to(element,{
    opacity: 1,
    ease: "power4.out",
    duration: 0.5
  })
}

const fadeOut = element => {
  gsap.to(element, {
    opacity: 0,
    ease: "power4.out",
    duration: 0.5
  })
}

const clipIn = element => {
  gsap.fromTo(element, {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: "power4.out",
    duration: 0.5
  })
}

const clipOut = element => {
  let tl = gsap.timeline()
    tl.to(element, {
      y: 0,
      opacity: 1
    }).to(element, {
      y: 0,
      opacity: 0,
      ease: "power4.out",
      duration: 0.5
    })
}

export {fadeIn, fadeOut, clipIn, clipOut}
