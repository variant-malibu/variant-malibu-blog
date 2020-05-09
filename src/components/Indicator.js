import React, {useEffect} from 'react'

function Indicator({positions, currentIdx}) {

  useEffect(()=> {
  }, [positions, currentIdx])

  const scrollTo = (evt,index) => {
    window.scrollTo({behavior: "smooth", top: positions[index]})
  }
  return (
    <div id="indicator">
      <div className={currentIdx === 0 ? "container active" : "container"}>
        <button className="box" onClick={(evt)=>scrollTo(evt,0)}></button>
        <div className="label">Overview</div>
      </div>
      <div className={currentIdx === 1 ? "container active" : "container"}>
        <button className="box" onClick={(evt)=>scrollTo(evt,1)}></button>
        <div className="label">Partners</div>
      </div>
      <div className={currentIdx === 2 ? "container active" : "container"}>
        <button className="box" onClick={(evt)=>scrollTo(evt,2)}></button>
        <div className="label">About & Blog</div>
      </div>
      <div className={currentIdx === 3 ? "container active" : "container"}>
        <button className="box" onClick={(evt)=>scrollTo(evt,3)}></button>
        <div className="label">Contact</div>
      </div>
    </div>
  )
}

export default Indicator
