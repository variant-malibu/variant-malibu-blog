import React, {useEffect} from 'react'
import * as ScrollMagic from 'scrollmagic'
import gsap from "gsap"
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";


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
  }

  return (
    <div id="home">
      <section className="panel overview">
        <h1>Custom 3D Knitwear</h1>
      </section>
      <section className="panel partners">
        <h1>Partners</h1>
      </section>
      <section className="panel blog">
        <h1>Fashion<br/>x<br/>Tech</h1>
      </section>
      <section className="panel contact">
        <h1>Contact</h1>
      </section>
    </div>
  )
}

export default Home
