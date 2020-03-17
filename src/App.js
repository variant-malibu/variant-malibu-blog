import React from 'react'
import './App.scss'
import logo from './assets/variant-logo.png'
import {ReactComponent as Menu} from './assets/bar.svg'
import {Grid} from '@material-ui/core'
import Blog from './Blog.js'

function App() {
  return (
    <div className='App'>
      <Grid id='navbar' container justify='space-between' alignItems='center' >
        <img src={logo} className='logo' alt='logo' />
        <Menu />
      </Grid>
      <Blog />
    </div>
  )
}

export default App;
