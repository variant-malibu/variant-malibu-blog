import React, {useState, useMemo} from 'react'
import './App.scss'
import Navbar from './components/Navbar'
import Routes from './components/Routes'
import {Context} from './contexts/Context'


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
