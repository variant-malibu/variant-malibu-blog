import React from 'react'
import './App.scss'
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Blog from './Blog'
import Post from './Post'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/blog/:id" component={Post} />
    </Switch>
  )
}

export default Routes;
