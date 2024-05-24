import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function Test() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const socket = io.connect("http://localhost:3001");

    socket.on('data', (data) => {
      setWeatherData(data);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("Updated weatherData state:", weatherData);
  }, [weatherData]);

  return (
    <div>
      <p className="temp-name">Temperature:</p>
      <div className="temp-container">
        <p className="temp">
          {weatherData.temperature !== undefined ? `${weatherData.temperature} °C` : "No data"}
        </p>
      </div>
      <hr style={{ backgroundColor: "white", height: "1px", border: "none" }} />
      <p className="humidity-name">Humidity:</p>
      <div className="humidity-container">
        <p className="humidity">
          {weatherData.humidity !== undefined? `${weatherData.humidity}%` : "No data"}
        </p>
      </div>
    </div>
  );
}

export default Test;

/* IN CASE OF NOT USING THE WEBSOCKET:
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
  }, []);*/
