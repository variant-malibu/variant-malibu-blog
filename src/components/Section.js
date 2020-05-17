import React from 'react'
import pants from '../assets/pants.png'
import shirt from '../assets/shirt.png'


function Section(props) {
  const { data, idx } = props

  return (
    <section className={"about-section " + data.action.toLowerCase()}>
      <div className="mesh">
        <img src={ idx % 2 === 0 ? pants : shirt} alt="mesh-img"/>
      </div>
      <div className="content">
        <div>
          <span className="we">We</span>
          <span className="action">{data.action}</span>
        </div>
        <p>{data.content}</p>
      </div>
    </section>
  )
}

export default Section
