import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "./Background";
function Test({ weatherState }) {
  const [weatherData, setWeatherData] = useState([]);
  const [temperature, setTemperature] = useState(25); // Example temperature
  const [backgroundState, setBackgroundState] = useState(""); // State to hold background state

  // Function to determine background state based on temperature
  const determineBackgroundState = (temp) => {
    if (temp >= 30) {
      return "sunny";
    } else if (temp <= 10) {
      return "rainy";
    } else {
      return "cloudy";
    }
  };

  // Set background state based on temperature
  useEffect(() => {
    const newBackgroundState = determineBackgroundState(temperature);
    setBackgroundState(newBackgroundState);
  }, [temperature]);

  // const [convertedTemperature, setConvertedTemperature] = useState(temperature);
  // const [convertedHumidity, setConvertedHumidity] = useState(humidity);
  /* const handleTemperatureChange = (value) => {
    setConvertedTemperature(value);
  };
  const handleHumidityChange = (value) => {
    setConvertedHumidity(value);
  };*/
  /*useEffect(() => {
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
  }, []);*/

  //instead of fecthing data once we need to create a connection with websocket
  //to make the component updated in real-time:
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setWeatherData((prevData) => [...prevData, data]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
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
      <hr style={{ backgroundColor: "white", height: "1px", border: "none" }} />
      <p className="humidity-name">Humidity:</p>
      <div className="humidity-container">
        <p className="humidity">
          {weatherData.length > 0 && `${weatherData[0].humidity}%`}
        </p>
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
