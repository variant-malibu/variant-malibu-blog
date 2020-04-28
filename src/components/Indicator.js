import React from 'react'

function Indicator() {
  return (
    <div id="indicator">
      <div className="container">
        <div className="box active"></div>
        <div className="label">Overview</div>
      </div>
      <div className="container">
        <div className="box"></div>
        <div className="label">Partners</div>
      </div>
      <div className="container">
        <div className="box"></div>
        <div className="label">About & Blog</div>
      </div>
      <div className="container">
        <div className="box"></div>
        <div className="label">Contact</div>
      </div>
    </div>
  )
}

export default Indicator
