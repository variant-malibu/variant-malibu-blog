import React, {useRef, useEffect, useState} from 'react'
import pants from '../assets/pants.png'
import shirt from '../assets/shirt.png'
import {fadeIn, fadeOut, clipIn, clipOut} from '../helpers/gsap'


function Section(props) {
  const { data, idx } = props
  const section = useRef(null)
  const we = useRef(null)
  const mask = useRef(null)

  useEffect(()=> {
    if (window.scrollY <= 300) {
    }
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          fadeIn(entry.target.children[0])
          clipIn(entry.target.children[2])
        } else {
          fadeOut(entry.target.children[0])
          clipOut(entry.target.children[2])
        }
    },{
      root: null,
      rootMargin: "70% 0% 0% 0%",
      threshold: 0.75
    })

    console.log(section)
    if (section.current) {
      observer.observe(section.current)
    }

    return () => {
      if (section) {
        observer.unobserve(section.current)
      }
    }
  },[])

  return (
    <section className={"content-wrapper " + data.action.toLowerCase()} ref={section}>
      <div className="mesh">
        <img src={ idx % 2 === 0 ? pants : shirt} alt="mesh-img"/>
      </div>
        <span className="we" ref={we}>We</span>
        <span className="action">{data.action}</span>
      <div className="mask" ref={mask}></div>
      <div className="content">
        <p>{data.content}</p>
      </div>
    </section>
  )
}

export default Section
