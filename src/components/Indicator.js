import React from 'react'

function Indicator({positions}) {

  const scrollTo = (index) => {
    window.scrollTo(0, positions[index])
  }
  return (
    <div id="indicator">
      <div className="container">
        <button className="box" onClick={()=>scrollTo(0)}></button>
        <div className="label">Overview</div>
      </div>
      <div className="container">
        <button className="box" onClick={()=>scrollTo(1)}></button>
        <div className="label">Partners</div>
      </div>
      <div className="container">
        <button className="box" onClick={()=>scrollTo(2)}></button>
        <div className="label">About & Blog</div>
      </div>
      <div className="container">
        <button className="box" onClick={()=>scrollTo(3)}></button>
        <div className="label">Contact</div>
      </div>
    </div>
  )
}

export default Indicator
