import React, {useState, useMemo} from 'react'
import './App.scss'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import Footer from './components/Footer'
import {PostContext} from './contexts/PostContext'


function App() {
  const [currentPost, setCurrentPost] = useState({})
  const providerValue = useMemo(()=>({ currentPost, setCurrentPost}), [currentPost, setCurrentPost])
  console.log("APP:", currentPost)
  return (
    <PostContext.Provider value={providerValue}>
      <Navbar />
      <Routes/>
      <Footer/>
    </PostContext.Provider>
  )
}

export default App
