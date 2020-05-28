import React, {useState, useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import Footer from './components/Footer'
import {ThemeContext} from './contexts/ThemeContext'
import {Grid} from '@material-ui/core'
import './App.scss'

function App() {

  const [darkTheme, setDarkTheme] = useState(true)
  const location = useLocation()
  const darkThemes = ["/", "/blog", "/partners"]

  useEffect(() => {

    if (darkThemes.includes(location.pathname)) {
      setDarkTheme(true)
      document.body.style.backgroundColor = "black"
    } else {
      setDarkTheme(false)
      document.body.style.backgroundColor = "white"
    }

  },[location])

  return (
    <ThemeContext.Provider value={{darkTheme, setDarkTheme}}>
      <Grid container id="app">
        <Navbar location={location} />
        <Routes/>
        <Footer/>
      </Grid>
    </ThemeContext.Provider>
  )
}

export default App
