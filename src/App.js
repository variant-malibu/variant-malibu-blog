import React from 'react'
import './App.scss'
import Navbar from './Navbar'
import Routes from './Routes'
import Blog from './Blog'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Blog/>
    </div>
  )
}

export default App;
