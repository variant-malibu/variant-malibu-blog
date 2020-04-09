import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Blog from './Blog'
import Post from './Post'
import Contact from './Contact'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/blog/:id" component={Post} />
    </Switch>
  )
}

export default Routes;
