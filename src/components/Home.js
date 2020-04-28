import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import * as ScrollMagic from 'scrollmagic'
import Indicator from './Indicator'


const Home = () => {



  useEffect (() => {
    sectionWipes()
  },[])

  const sectionWipes = () => {
    let controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave',
				duration: "200%"
			}
		});

		// get all slides
		var slides = document.querySelectorAll("section.panel");

		// create scene for every slide
		for (var i=0; i<slides.length; i++) {
			new ScrollMagic.Scene({
					triggerElement: slides[i]
				})
				.setPin(slides[i], {pushFollowers: false})
				.addTo(controller);
    }

    console.log("controller:", controller)
  }

  return (
    <div id="home">
      <Indicator/>
      <section className="panel bg overview">
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
