import React, { useState } from "react";
import "./WeatherCard.css";
import UnitChanger from "./UnitChanger.jsx";
import CurrentWeatherAPI from "./CurrentWeatherAPI.jsx"
import Test from "./Test.jsx";
// TODO have to recieve props from json file?
function WeatherCard({ temperature, humidity, windSpeed, pressure }) {
 
  const [convertedPressure, setConvertedPressure] = useState(pressure);
  const [convertedWindSpeed, setConvertedWindSpeed] = useState(windSpeed);
 
  const handlePressureChange = (value) => {
    setConvertedPressure(value);
  };
  const handleWindSpeedchange = (value) => {
    setConvertedWindSpeed(value);
  };

  return (
    <>
    <h1>The current weather in Constantine:</h1>
      <div className="glassCard">
       <Test/>
        <hr
          style={{ backgroundColor: "white", height: "1px", border: "none" }}
        />
        <p className="wind-name">Wind Speed:</p>
        <div className="windspeed-container">
          <p className="windspeed">
            <CurrentWeatherAPI typeData="windSpeed" /> {UnitChanger.selected}
          </p>
          <UnitChanger
            options={["m/s", "km/h"]}
            value={windSpeed}
            onSelect={handleWindSpeedchange}
          />
        </div>

        <hr
          style={{ backgroundColor: "white", height: "1px", border: "none" }}
        />
        <p className="pressure-name">Pressure:</p>
        <div className="pressure-container">
          <p className="pressure"><CurrentWeatherAPI typeData="pressure"/> </p>
          <UnitChanger
            options={["Pa", "ATM"]}
            value={pressure}
            onSelect={handlePressureChange}
          />
        </div>
      </div>
    </>
  );
}

export default WeatherCard;