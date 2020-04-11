import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Blog from './Blog'
import Post from './Post'
import Contact from './Contact'
import Terms from './Terms'
import Privacy from './Privacy'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/privacy-policy" component={Privacy} />
      <Route exact path="/terms-and-conditions" component={Terms} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/blog/:id" component={Post} />
    </Switch>
  )
}

export default Routes;
