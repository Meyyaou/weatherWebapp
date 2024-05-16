import React from "react";
import "./InfoWidget.css";
import WeatherDetails from "./WeatherDetails";
import heat from '../assets/heater.png';
import dew from "../assets/dew.png";
import feel from "../assets/man.png";
import visible from "../assets/shared-vision.png";

function InfoWidget() {
  return (
    <>
      <p className="title-info">Info:</p>
      <div className="small-grid-container">
        <div className="small-grid-item">
          <img src={dew} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <h3>34 %</h3>
          <p>Dew Point</p>
        </div>
        <div className="small-grid-item">
        <img src={feel} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <WeatherDetails typeData="feels_like" style={{ display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <p>Feels Like</p>
        </div>
        <div className="small-grid-item">
        <img src={heat} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <h3>24 °C</h3>
          <p>Heat Index</p>
        </div>
        <div className="small-grid-item">
        <img src={visible} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
        <WeatherDetails typeData="visibility" style={{ display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <p>Visibility</p>
        </div>
      </div>
    </>
  );
}

export default InfoWidget;
