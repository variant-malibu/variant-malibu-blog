import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Indicator from './Indicator'
import arrow from '../assets/down-arrow.png'
import smoothscrollPolyfill from 'smoothscroll-polyfill'

const Home = React.memo(() => {

  const [sections, setSections] = useState([])
  const [triggerPos, setTriggerPos] = useState([])
  const [counter, setCounter] = useState(1)
  const [currentIdx, setCurrentIdx] = useState(null)

  let overview = useRef()
  let partners = useRef()
  let about = useRef()
  let blog = useRef()
  let contact = useRef()


  useEffect (() => {
    smoothscrollPolyfill.polyfill()

    getSections()
    let sections = document.querySelectorAll("section.panel")
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

  const getSections = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND + "/home-sections")
      const data = await res.json()

      const sections = data.map(section => {
        const panels = section.section.map( panel => {
          return {
            title: panel.title,
            coverUrl: panel.cover.url,
            type: panel.cover.mime.split("/")[0] || null
          }
        })
        return {
          name: section.name,
          order: section.order,
          panels: panels
        }
      }).sort((a,b) => {
        if (a.order < b.order) return -1
        if (a.order > b.order) return 1
        return 0
      })
      setSections(sections)

    } catch (err) {
      console.error(err)
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

  const displaySections = () => {
    return sections.map( (section, idx) => {
      let sectionClassName = section.panels.length > 1 ? "columns" : "default"
      return (
        <section key={section.name} className={sectionClassName}>
        {
          getSectionContent(section.panels, section.length-1 === idx)
        }
        </section>
      )
    })
  }

  const getSectionContent = (panels, lastSection) => {
    return panels.map( (panel, idx) => {
      const panelClassName = panels.length > 1 ? `panel bg column${idx+1}` : "panel bg"
      const panelStyle = {
        "backgroundImage": `url(${panel.coverUrl})`
      }
      return (
        <div key={Math.random()} className={panelClassName} style={panelStyle}>
        {
          panel.title && <h1 className={panel.type}>{panel.title}</h1>
        }
        {
          panel.type === "video" &&
            <video autoPlay muted loop>
              <source src={panel.coverUrl}/>
            </video>
        }
        {
          panels.length-1 === idx && !lastSection &&
          <button className="down-arrow" onClick={handleClick}>
            <img src={arrow} alt="down-arrow" />
          </button>
        }
        </div>
      )
    })

  }

  return (
    <div id="home" className="page">
      <Indicator positions={triggerPos} currentIdx={currentIdx} />
      {
        displaySections()
      }
      {/* <section className="panel bg overview" >
        <h1 className="video">Custom <br/> 3D Knitwear</h1>
        <button className="down-arrow" onClick={handleClick}>
          <img src={arrow} alt="down-arrow" />
        </button>
        <video autoPlay muted loop ref={overview}>
          <source/>
        </video>
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
          <button className="down-arrow" onClick={handleClick}>
          <img src={arrow} alt="down-arrow" />
        </button>
        </div>
      </section>
      <section className="panel bg contact" key={3} ref={contact}>
        <Link to="/contact"><h1>Contact</h1></Link>
      </section> */}
    </div>
  )
})

export default Home
