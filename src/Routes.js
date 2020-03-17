import React from 'react'
import './App.scss'
import {Switch, Route} from 'react-router-dom'
import App from './App'
import Blog from './Blog'


function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Blog} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/blog:name" component={Blog} />
    </Switch>
  )
}

export default Routes;
