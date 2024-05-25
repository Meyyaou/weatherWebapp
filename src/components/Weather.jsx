import React, { useEffect, useState } from "react";
import axios from "axios";
import sunnyCloudy from "../assets/sun&cloud.png";
import sunny from "../assets/sun.png";
import cloudy from "../assets/clouud.png";
import lightening from "../assets/lightening.png";
import rain from "../assets/rain.png";
const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3258acf3613370332f9694e6267b94a5
        `
        );

        setWeatherData(response.data);
        const temp =response.data.main.temp;
        if (temp <= 5) {
          setIcon(rain);
        } else if (temp >= 10 && temp < 15) {
          setIcon(cloudy);
        } else if (temp >= 15 && temp <= 20) {
          setIcon(sunnyCloudy);
        }else if (temp > 20) {
          setIcon(sunny);
        } else {
          setIcon(lightening);
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {weatherData ? (
        <>
          <img
            src={icon}
            style={{
              position: "relative",
              top: "10%",
              height: "70px",
              width: "70px",
              cursor: "auto",
            }}
          />
          <h2 style={{fontSize: "1.6em"}}>{weatherData.name}</h2>

          <p>{weatherData.main.temp}°C</p>
        </>
      ) : (
        <p style={{fontSize: "1.2em"}}>Loading weather data...</p>
      )}
    </>
  );
};

export default Weather;
