import React, {useState, useMemo} from 'react'
import './App.scss'
import Navbar from './Navbar'
import Routes from './Routes'
import {Context} from './Context'


function App() {
  const [currentPost, setCurrentPost] = useState({})
  const providerValue = useMemo(()=>({ currentPost, setCurrentPost}), [currentPost, setCurrentPost])
  return (
    <div className='App'>
      <Context.Provider value={providerValue}>
        <Navbar />
        <Routes/>
      </Context.Provider>
    </div>
  )
}

export default App
