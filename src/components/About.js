import React, {useRef, useEffect, useState} from 'react'
import data from '../assets/about-data'
import {fadeIn, fadeOut, clipIn} from '../helpers/gsap'
import Section from './Section'


function About() {

  const observerRoot = useRef(null)

  const handleScroll = () => {
    let scrollEndPosition = document.body.clientHeight - window.innerHeight - 250
    if (window.scrollY > 300 && window.scrollY <= scrollEndPosition) {
      fadeIn(observerRoot.current)
    } else if (window.scrollY <= 300 || window.scrollY > scrollEndPosition) {
      fadeOut(observerRoot.current)
    }
  }

  useEffect(()=> {
    observerRoot.current.style.opacity = 0
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[])


  return (
    <div id="about">
      <div className="banner-wrapper">
        <div className="sliding-banner about"></div>
      </div>
      <div id="observerRoot" ref={observerRoot}>
      {
        data.map((data, idx) => {
          return <Section data={data} idx={idx} key={idx} />
        })
      }
      </div>
    </div>
  )
}

export default About
