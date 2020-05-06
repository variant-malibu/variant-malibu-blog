import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Indicator from './Indicator'
import arrow from '../assets/down-arrow.png'


const Home = () => {

  let [triggerPos, setTriggerPos] = useState([])
  let [counter, setCounter] = useState(1)
  let [currentIdx, setCurrentIdx] = useState(0)

  let overview = useRef()
  let partners = useRef()
  let about = useRef()
  let blog = useRef()
  let contact = useRef()

  useEffect (() => {
    let sections = document.querySelectorAll("section.panel")
    getCoverImages()
    getTriggerPositions(sections)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCurrentIdx(entry.target.key)
      }
    },{
      root: null,
      rootMargin: "0% 0% 0% 0%",
      threshold: 0.75
    })

    sections.forEach( (section, index)=> {
      section.key = index
      section && observer.observe(section)
    })

    return () => {
      sections.forEach(section => {
        section && observer.unobserve(section)
      })
    }

  },[])


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

  const getTriggerPositions = (sections) => {
    let positions = []
    Array.from(sections).map(section => {
      positions.push(section.offsetTop)
    })
    setTriggerPos(positions)
  }

  const handleClick = () => {
    let index = counter
    if (index >= 4) index = 0
    window.scrollTo(0, triggerPos[index])
    setCounter(++index)
  }

  return (
    <div id="home" className="page">
      <Indicator positions={triggerPos} currentIdx={currentIdx} />
      <section className="panel bg overview" ref={overview} >
        <h1>Custom <br/> 3D Knitwear</h1>
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
      <section className="panel columns" key={2}>
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
      <section className="panel bg contact" key={3} ref={contact}>
        <Link to="/contact"><h1>Contact</h1></Link>
        <button className="back-to-top" onClick={handleClick}>
          BACK TO TOP
        </button>
      </section>
    </div>
  )
}

export default Home
