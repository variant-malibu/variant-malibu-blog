import React, {useRef, useEffect, useState} from 'react'
import data from '../assets/about-data'
import {fadeIn, fadeOut, clipIn} from '../helpers/gsap'
import Section from './Section'


function About() {

  return (
    <div id="about">
      <div className="banner-wrapper">
        <div className="sliding-banner about"></div>
      </div>
      <div className="sections">
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
