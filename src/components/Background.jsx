import React, { useState, useEffect } from "react";
import "./Background.css";
import staticCloud from "../assets/pngimg.com - cloud_PNG6.png";
import staticSun from "../assets/pngimg.com - sun_PNG13445.png";
import staticRainCloud from "../assets/staticRainCloud.png";
import axios from "axios";
const Background = ({ backgroundState }) => {
  const [feelsLike, setFeels] = useState(null); // State to hold the feels_like value
  const [newBackgroundState, setNewBackgroundState] = useState(""); // State to hold the updated backgroundState
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=36.3650&lon=6.6147&appid=3258acf3613370332f9694e6267b94a5
          `
        );

        setFeels(response.data);

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set new background state based on feelsLike value
    if (feelsLike !== null) {
      if (feelsLike >= 30) {
        setNewBackgroundState("sunny");
      } else if (feelsLike <= 10) {
        setNewBackgroundState("rainy");
      } else {
        setNewBackgroundState("cloudy");
      }
    }
  }, [feelsLike]); // Update when feelsLike value changes

  // Render based on the newBackgroundState
  if (newBackgroundState === "cloudy") {
    return (
      <>
        <div className="icon-container">
          <img src={staticCloud} alt="Cloudy" />
          <p className="description1">{newBackgroundState}</p>
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
  } else if (newBackgroundState === "sunny") {
    return (
      <>
        <div className="icon1-container">
          <img src={staticSun} alt="Sunny" />
          <p className="description2">{newBackgroundState}</p>
          <p className="place2">Constantine</p>
        </div>
        <div className="sun-container">
          <div className="sun2"></div>
          <div className="sun3"></div>
        </div>
      </>
    );
  } else if (newBackgroundState === "rainy") {
    return (
      <>
        <div className="icon2-container">
          <img src={staticRainCloud} alt="Rainy" />
          <p className="description3">{newBackgroundState}</p>
          <p className="place3">Constantine</p>
        </div>
        <section className="rain1"></section>
      </>
    );
  } else {
    // Handle any other case or return a default component
    return null; // or any default component
  }
};

export default Background;
