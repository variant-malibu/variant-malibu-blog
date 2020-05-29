import React, {useEffect} from 'react'

const Indicator = React.memo(({positions, currentIdx, labels}) => {

  const scrollTo = (evt,index) => {
    window.scrollTo({behavior: "smooth", top: positions[index]})
  }
  return (
    <div id="indicator">
      {
        labels.map((label,labelIdx) => {
          return (
            <div className={`container ${currentIdx === labelIdx && "active"}`} key={label.id}>
              <button className="box" onClick={(evt)=>scrollTo(evt,labelIdx)}></button>
              <div className="label">{label.name}</div>
            </div>
          )
        })
      }
    </div>
  )
})

export default Indicator
