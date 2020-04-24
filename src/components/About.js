import React, {useRef, useEffect, useState} from 'react'
import pants from '../assets/pants.png'
import shirt from '../assets/shirt.png'
import data from '../assets/about-data'
import * as ScrollMagic from 'scrollmagic'
import gsap, {TimelineMax} from 'gsap'


function About() {

  const [refs, setRefs] = useState([])
  const [hidden, setHidden] = useState(true)
  const observerRoot = useRef(null)

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry => {
        console.log("target:", entry.target, entry.isIntersecting)
        if (entry.isIntersecting) {
          fadeIn(entry.target.children[0])
          //clipIn(entry.target.children[1])
          slideIn(entry.target.children[2])
        } else {
          fadeOut(entry.target.children[0])
          //clipOut(entry.target.children[1])
          slideOut(entry.target.children[2])
        }
      })
    },{
      root: null,
      rootMargin: "0% 0% -50% 0%",
      threshold: 0.5
    })

    if (refs.length > 0) {
      refs.forEach(ref => observer.observe(ref))
    }

    return () => {
      if (refs.length > 0) {
        refs.forEach(ref => observer.observe(ref))
      }
      window.removeEventListener('scroll', handleScroll);
    }

  },[])

  const handleScroll = () => {
    let scrollEndPosition = document.body.clientHeight - window.innerHeight - 100
    if (window.scrollY > 150 && window.scrollY <= scrollEndPosition) {
      observerRoot.current.style.opacity = 1
      //observerRoot.current.style.display = "block"
    } else {
      observerRoot.current.style.opacity = 0
      //observerRoot.current.style.display = "none"
    }
  }

  const trackRef = (ref) => {
    let temp = refs
    temp.push(ref)
    setRefs(temp)
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

  const slideIn = element => {
    gsap.fromTo(element, {
      y: 0,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: "power4.out",
      duration: 0.5
    })
  }

  const slideOut = element => {
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



  return (
    <div id="about">
      <div className="banner-wrapper">
        <div className="sliding-banner about"></div>
      </div>
      <div id="observerRoot" ref={observerRoot}>
      {
        data.map((data, idx) => {
          return (
            <section className={"content-wrapper " + data.action} key={idx} ref={ctx => trackRef(ctx)}>
              <div className="mesh">
                <img src={ idx % 2 === 0 ? pants : shirt} alt="mesh-img" className={data.action + "mesh"} />
              </div>
              <span className="we">We</span>
              <div className="gist">
                <span className="action">{data.action}</span>
                <p className="content">{data.content}</p>
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
