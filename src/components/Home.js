import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import * as ScrollMagic from 'scrollmagic'
import Indicator from './Indicator'
import arrow from '../assets/down-arrow.png'


const Home = () => {

  let [triggerPos, setTriggerPos] = useState([])
  let [counter, setCounter] = useState(1)

  let overview = useRef()
  let partners = useRef()
  let about = useRef()
  let blog = useRef()
  let contact = useRef()

  useEffect (() => {
    sectionWipes()
    getCoverImages()
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
        .setPin(slides[i], {pushFollowers: true})
        .setClassToggle(indicators[i], "active")
        .addTo(controller)

        positions.push(slideScene.triggerPosition())
    }
    setTriggerPos([...positions])
  }

  const getCoverImages = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND + "/home")
      const data = await res.json()

      overview.current.style.backgroundImage = `url(${data.overview.url})`
      partners.current.style.backgroundImage = `url(${data.partners.url})`
      about.current.style.backgroundImage = `url(${data.about.url})`
      blog.current.style.backgroundImage = `url(${data.blog.url})`
      contact.current.style.backgroundImage = `url(${data.contact.url})`

    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = () => {
    let index = counter
    if (index >= 4) index = 0
    window.scrollTo(0, triggerPos[index])
    setCounter(++index)
  }

  return (
    <div id="home" className="page">
      <Indicator positions={triggerPos} />
      <section className="panel bg overview" ref={overview} >
        <h1>Custom 3D Knitwear</h1>
        <button className="down-arrow" onClick={handleClick}>
          <img src={arrow} alt="down-arrow" />
        </button>
      </section>
      <section className="panel bg partners" ref={partners}>
        <Link to="/partners"><h1>Partners</h1></Link>
        <button className="down-arrow" onClick={handleClick}>
          <img src={arrow} alt="down-arrow" />
        </button>
      </section>
      <section className="panel columns">
        <div className="bg about" ref={about}>
          <Link to="/about"><h1>About Us</h1></Link>
        </div>
        <div className="bg blog" ref={blog}>
          <Link to="/blog"><h1>Fashion<br/>x<br/>Tech</h1></Link>
        </div>
        <button className="down-arrow" onClick={handleClick}>
          <img src={arrow} alt="down-arrow" />
        </button>
      </section>
      <section className="panel bg contact" ref={contact}>
        <Link to="/contact"><h1>Contact</h1></Link>
        <button className="back-to-top" onClick={handleClick}>
          BACK TO TOP
        </button>
      </section>
    </div>
  )
}

export default Home
