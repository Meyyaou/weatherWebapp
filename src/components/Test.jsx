import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [weatherData, setWeatherData] = useState([]);
 // const [convertedTemperature, setConvertedTemperature] = useState(temperature);
 // const [convertedHumidity, setConvertedHumidity] = useState(humidity);
 /* const handleTemperatureChange = (value) => {
    setConvertedTemperature(value);
  };
  const handleHumidityChange = (value) => {
    setConvertedHumidity(value);
  };*/
  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get('http://localhost:3000/getWeatherData');
        setWeatherData(response.data);
        console.log("hre is the data : ", weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchWeatherData();
  }, []);

   

  return (
    <div>
      <p className="temp-name">Temperature:</p>
        <div className="temp-container">
          <p className="temp">
    {weatherData.length > 0 && `${weatherData[0].temperature} °C`}
          </p>
         {/* <UnitChanger
            options={["°C", "°F"]}
            value={temperature}
            onSelect={handleTemperatureChange}
  />*/}
        </div>
        <hr
          style={{ backgroundColor: "white", height: "1px", border: "none" }}
        />
        <p className="humidity-name">Humidity:</p>
        <div className="humidity-container">
          <p className="humidity">{weatherData.length > 0 && `${weatherData[0].humidity}%`}</p>
         {/* <UnitChanger
            options={["%", "RH"]}
            value={humidity}
            onSelect={handleHumidityChange}
/>*/}{" "}
        </div>
      
    </div>
  );
}

export default Test;
/**  */