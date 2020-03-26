import React, {useState, useMemo} from 'react'
import './App.scss'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import Footer from './components/Footer'
import {PostContext} from './contexts/PostContext'
import {Grid} from '@material-ui/core'


function App() {
  const [currentPost, setCurrentPost] = useState({})
  const providerValue = useMemo(()=>({ currentPost, setCurrentPost}), [currentPost, setCurrentPost])
  console.log("APP:", currentPost)
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
