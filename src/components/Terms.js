import React from 'react'
import {content} from '../assets/terms-content.js'

const Terms = () => {
  return (
    <div id="legal" className="content-wrapper">
      <div className="banner-wrapper">
        <div className="sliding-banner terms"></div>
      </div>
      <div id="scrollbar" className="content">{content}</div>
    </div>
  )
}

export default Terms
