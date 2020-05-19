import React from 'react'
import data from '../assets/about-data'
import Section from './Section'


function About() {

  return (
    <div id="about" className="content-wrapper">
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
