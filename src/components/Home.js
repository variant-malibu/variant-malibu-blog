import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import * as ScrollMagic from 'scrollmagic'
import Indicator from './Indicator'


const Home = () => {

  let [triggerPos, setTriggerPos] = useState([])

  useEffect (() => {
    sectionWipes()
  },[])

  const sectionWipes = () => {
    let controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: "onLeave",
				duration: "100%"
			}
		})

		// get all slides
    let slides = document.querySelectorAll("section.panel")
    let indicators = document.querySelectorAll("#indicator .container")

    let positions = []
		// create scene for every slide
		for (var i=0; i<slides.length; i++) {
			let slideScene = new ScrollMagic.Scene({
					triggerElement: slides[i]
				})
        .setPin(slides[i], {pushFollowers: false})
        .setClassToggle(indicators[i], "active")
        .addTo(controller)

        positions.push(slideScene.triggerPosition())
    }
    setTriggerPos([...positions])
  }

  return (
    <div id="home" className="page">
      <Indicator positions={triggerPos} />
      <section className="panel bg overview" >
        <h1>Custom 3D Knitwear</h1>
      </section>
      <section className="panel bg partners">
        <Link to="/partners"><h1>Partners</h1></Link>
      </section>
      <section className="panel columns">
        <div className="bg about">
          <Link to="/about"><h1>About Us</h1></Link>
        </div>
        <div className="bg blog">
          <Link to="/blog"><h1>Fashion<br/>x<br/>Tech</h1></Link>
        </div>
      </section>
      <section className="panel bg contact">
        <Link to="/contact"><h1>Contact</h1></Link>
      </section>
    </div>
  )
}

export default Home
