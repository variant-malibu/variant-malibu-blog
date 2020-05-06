import React, {useRef, useEffect, useState} from 'react'
import pants from '../assets/pants.png'
import shirt from '../assets/shirt.png'
import {fadeIn, fadeOut, clipIn, clipOut} from '../helpers/gsap'


function Section(props) {
  const { data, idx } = props

  return (
    <section className={"content-wrapper " + data.action.toLowerCase()}>
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
