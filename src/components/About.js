import React, {useRef, useEffect, useState} from 'react'
import pants from '../assets/pants.png'
import shirt from '../assets/shirt.png'
import data from '../assets/about-data'
import * as ScrollMagic from 'scrollmagic'
import gsap from 'gsap'


function About() {

  const [refs, setRefs] = useState([])
  const [hidden, setHidden] = useState(false)

  useEffect(()=> {
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        console.log("target:", entry.target, entry.isIntersecting)
        setHidden(entry.isIntersecting)
        if (entry.isIntersecting) {
          fadeIn(entry.target.children[0])
          fadeIn(entry.target.children[2])
        } else {
          fadeOut(entry.target.children[0])
          fadeOut(entry.target.children[2])
        }
      })
    },{
      root: null,
      rootMargin: "0% 0% -50% 0%",
      threshold: 0.25
    })

    if (refs.length > 0) {
      refs.forEach(ref => observer.observe(ref))
    }

    return () => {
      if (refs.length > 0) {
        refs.forEach(ref => observer.observe(ref))
      }
    }

  },[refs])

  const trackRef = (ref) => {
    let temp = refs
    temp.push(ref)
    setRefs(temp)
  }

  const fadeIn = element => {
    gsap.to(element, 0.5, {
      opacity: 1,
      ease: "power4.out"
    })
  }

  const fadeOut = element => {
    gsap.to(element, 0.5, {
      opacity: 0,
      ease: "power4.out"
    })
  }

  const clipIn = element => {
    gsap.to(element, 0.5, {
      opacity: 1
    })
  }

  const clipOut = element => {
    gsap.set(element, {
      position: "relative"
    })
  }



  return (
    <div id="about">
      <div className="banner-wrapper">
        <div className="sliding-banner about"></div>
      </div>
      {
        data.map((data, idx) => {
          return (
            <section className={"content-wrapper " + data.action} key={idx} ref={ctx => trackRef(ctx)}>
              <div className="mesh">
                <img src={ idx % 2 === 0 ? pants : shirt} alt="mesh-img" className={data.action + "mesh"} />
              </div>
              <span className="we">We</span>
              <div className="gist">
                <span className={hidden ? "action" : "action fade"}>{data.action}</span>
                <p className={hidden ? "content" : "content fade"}>{data.action}{data.content}</p>
              </div>
            </section>
          )
        })
      }

    </div>
  )
}

export default About
