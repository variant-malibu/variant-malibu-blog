import React, {useRef, useEffect, useState} from 'react'
import pants from '../assets/pants.png'
import shirt from '../assets/shirt.png'
import data from '../assets/about-data'
import * as ScrollMagic from 'scrollmagic'
import gsap, {TimelineMax} from 'gsap'


function About() {

  const [trackRefs, setTrackRefs] = useState([])
  const [contentRefs, setContentRefs] = useState([])
  const [animate, setAnimate] = useState(false)
  const observerRoot = useRef(null)

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        console.log("target:", entry, entry.isIntersecting)
        if (entry.isIntersecting) {
          fadeIn(entry.target.children[0])
          clipIn(entry.target.children[2])

        } else {
          fadeOut(entry.target.children[0])
          clipOut(entry.target.children[2])

        }
      })
    },{
      root: null,
      rootMargin: "70% 0% 0% 0%",
      threshold: 0.75
    })

    if (contentRefs.length > 0) {
      contentRefs.forEach(ref => observer.observe(ref))
    }

    return () => {
      if (contentRefs.length > 0) {
        contentRefs.forEach(ref => observer.observe(ref))
      }
      window.removeEventListener('scroll', handleScroll);
    }

  },[])

  const observer = () => {}

  const handleScroll = () => {
    let scrollEndPosition = document.body.clientHeight - window.innerHeight - 250
    if (window.scrollY > 300 && window.scrollY <= scrollEndPosition) {
      fadeIn(observerRoot.current)
    } else if (window.scrollY <= 300 || window.scrollY > scrollEndPosition) {
      fadeOut(observerRoot.current)
    }
  }

  const contentRef = (ref) => {
    let temp = contentRefs
    temp.push(ref)
    setContentRefs(temp)
  }

  const trackRef = (ref) => {
    let temp = trackRefs
    temp.push(ref)
    setTrackRefs(temp)
  }

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
      duration: 0.25
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
        duration: 0.25
      })
  }



  return (
    <div id="about">
      <div className="banner-wrapper">
        <div className="sliding-banner about"></div>
      </div>
      <div id="observerRoot" ref={observerRoot}>
      {
        data.map((data, idx) => {
          return (
            <section className={"content-wrapper " + data.action} key={idx} ref={ctx => contentRef(ctx)}>
              <div className={animate ? "mesh animate":"mesh"}>
                <img src={ idx % 2 === 0 ? pants : shirt} alt="mesh-img"/>
              </div>
              {/* <div className="heading"> */}
                <span className={animate ? "we animate":"we"} ref={ctx => trackRef(ctx)}>We</span>
                <span className={animate ? "action animate":"action"} ref={ctx => trackRef(ctx)}>{data.action}</span>
              {/* </div> */}
              <div className="content">
                <p>{data.content}</p>
              </div>
            </section>
          )
        })
      }
      </div>
    </div>
  )
}

export default About
