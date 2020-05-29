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
        const panels = section.panel.map( panel => {
          return {
            id: panel.id,
            title: panel.title,
            mediaUrl: panel.media.url,
            urlpath: panel.urlpath,
            type: panel.media.mime.split("/")[0] || null
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
        "backgroundImage": `url(${panel.mediaUrl})`
      }
      return (
        <div key={panel.id} className={panelClassName} style={panelStyle}>
        {
          panel.title &&

            <h1 className={panel.type}>
              <Link to={"/" + panel.urlpath}>{panel.title}</Link>
            </h1>
        }
        {
          panel.type === "video" &&
            <video autoPlay muted loop>
              <source src={panel.mediaUrl}/>
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
    </div>
  )
})

export default Home
