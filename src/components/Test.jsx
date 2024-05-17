import React, { useState, useEffect } from "react";

function Test() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8009");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed data:", data);
        setWeatherData((prevData) => [data, ...prevData]);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
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

  useEffect(() => {
    console.log("Updated weatherData state:", weatherData);
  }, [weatherData]);

  return (
    <div>
      <p className="temp-name">Temperature:</p>
      <div className="temp-container">
        <p className="temp">
          {weatherData.length > 0 ? `${weatherData.temperature} °C` : "No data"}
        </p>
      </div>
      <hr style={{ backgroundColor: "white", height: "1px", border: "none" }} />
      <p className="humidity-name">Humidity:</p>
      <div className="humidity-container">
        <p className="humidity">
          {weatherData.length > 0 ? `${weatherData.humidity}%` : "No data"}
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
