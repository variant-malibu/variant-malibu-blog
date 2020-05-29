import React, {useRef, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Indicator from './Indicator'
import arrow from '../assets/down-arrow.png'
import smoothscrollPolyfill from 'smoothscroll-polyfill'
import Loader from 'react-loader-spinner'

const Home = React.memo(() => {

  const [sections, setSections] = useState([])
  const [triggerPos, setTriggerPos] = useState([])
  const [counter, setCounter] = useState(1)
  const [currentIdx, setCurrentIdx] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect (() => {
    smoothscrollPolyfill.polyfill()
    getSectionData()
  },[])

  useEffect(()=> {
    let sections = document.querySelectorAll("section")
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

  },[loading])

  const getSectionData = async () => {
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
          id: section.id,
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
      setLoading(false)

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
    <>
      { loading ?
      <div className="loading">
        <Loader type="ThreeDots" color="#D8E3C3" height={50} width={50} />
      </div> :
      <div id="home" className="page">
        <Indicator positions={triggerPos} currentIdx={currentIdx} labels={sections} />
        {
          displaySections()
        }
      </div>
    }
    </>
  )
})

export default Home
