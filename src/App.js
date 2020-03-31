import React, {useState, useMemo, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import Footer from './components/Footer'
import {PostContext} from './contexts/PostContext'
import {Grid} from '@material-ui/core'
import './App.scss'

function App() {
  const [currentPost, setCurrentPost] = useState({})
  const providerValue = useMemo(()=>({ currentPost, setCurrentPost}), [currentPost, setCurrentPost])

  useEffect(() => {
    console.log("navbar currentPost:", currentPost)
    if (currentPost.id === undefined) {
      document.getElementById("root").classList.add("dark")
    } else {
      document.getElementById("root").classList.remove("dark")
    }

  },[currentPost])

  return (
    <PostContext.Provider value={providerValue}>
      <Grid container>
        <Navbar />
        <Routes/>
        <Footer/>
      </Grid>
    </PostContext.Provider>
  )
}

export default App
