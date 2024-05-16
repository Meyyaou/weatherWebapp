import "./Background.css";
import staticCloud from "../assets/pngimg.com - cloud_PNG6.png";
import staticSun from "../assets/pngimg.com - sun_PNG13445.png";
import staticRainCloud from '../assets/staticRainCloud.png';
import { useState } from "react";
const Background = ({ backgroundState }) => {
  const [weatherState, setWeatherState]= useState("");

  if (backgroundState == "cloudy") {
    return (
      <>
        <div className="icon-container">
          <img src={staticCloud} /><p className="description1">{backgroundState}</p>
          <p className="place1">Constantine</p>
        </div>
        
        <div className="cloud-container">
          <div className="cloud1"></div>
          <div className="cloud2"></div>
          <div className="cloud1"></div>
          <div className="cloud3"></div>
        </div>
      </>
    );
  }
  if (backgroundState == "sunny") {
    return(
      <>
      <div className="icon1-container">
      <img src={staticSun}/><p className="description2">{backgroundState}</p>
      <p className="place2">Constantine</p>
    </div>
    
      <div className="sun-container">
        
        <div className="sun2"></div>
        <div className="sun3"></div>
      </div>
    </>
  )}
  if(backgroundState == "rainy"){
    return(
      <>
      <div className="icon2-container">
          <img src={staticRainCloud}/><p className="description3">{backgroundState}</p>
      <p className="place3">Constantine</p>
      </div>
      <section className="rain1"></section>
      </>
    )
  };
};



export default Background;
