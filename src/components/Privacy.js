import React from 'react'
import {content} from '../assets/privacy-content.js'

const Privacy = () => {
  return (
    <div id="legal" className="content-wrapper">
      <div className="banner-wrapper">
        <div className="sliding-banner privacy"></div>
      </div>
      <pre id="scrollbar" className="content">{content}</pre>
    </div>
  )
}

export default Privacy
