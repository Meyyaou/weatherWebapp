import React from 'react'
import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset.png';
import Sunhour from './Sunhour';
import './SunhourWidget.css';

function SunhourWidget() {
  return (
    <div>
      <div className="sunhour-container">
    <p className="title-sunhour">Dusk & Dawn:</p>
      <img src={sunrise} alt="sunrise" className="sunrise" />
      <Sunhour city="Constantine"/>
      <div className="line"></div>
      <img src={sunset} alt="sunset" className="sunset" />
    </div>
    </div>
  )
}

export default SunhourWidget
