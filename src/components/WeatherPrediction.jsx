import React, { useState, useEffect } from "react";
import axios from "axios";
import sunnyCloudy from "../assets/sun&cloud.png";
import sunny from "../assets/sun.png";
import cloudy from "../assets/clouud.png";
import lightening from "../assets/lightening.png";
import rain from "../assets/rain.png";

import Lottie from "react-lottie";
import loadingImage from "../assets/loadingPredict.json";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import "./WeatherPrediction.css";
function WeatherPrediction() {
  const [predictedWeatherData, setPredictedWeatherData] = useState(null);
  const [curr, setCurr] = useState(0);
  const [icon, setIcon] = useState(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=Constantine&appid=XXXX&units=metric`
        );
        setPredictedWeatherData(response.data);

        console.log("here is the prediction :", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const prev = () =>
    setCurr((index) =>
      index === 0 ? predictedWeatherData.list.length - 1 : index - 1
    );

  const next = () =>
    setCurr((index) =>
      index === predictedWeatherData.list.length - 1 ? 0 : index + 1
    );

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      weekday: "long",
      hour: "numeric",
      hour12: false,
      minute: "numeric",
      timeZone: "Africa/Algiers",
    };
    return dateTime.toLocaleString("en-US", options);
  };
  const getIcon = (temp) => {
    if (temp <= 5) {
      return rain;
    } else if (temp >= 10 && temp < 15) {
      return cloudy;
    } else if (temp >= 15 && temp <= 20) {
      return sunnyCloudy;
    } else if (temp > 20) {
      return sunny;
    } else {
      return lightening;
    }
  };
  const filterForecasts = (forecasts) => {
    // Filter forecasts to include only those that occur at 6-hour intervals
    return forecasts.filter((forecast, index) => index % 6 * 3 === 0);
  };

  return (
    <>
      <div>
        {predictedWeatherData ? (
          <div>
            <h2 style={{ textAlign: "center" }}>
              {predictedWeatherData.city.name}
            </h2>
            <div className="gallery-forecast">
              {filterForecasts(predictedWeatherData.list).map(
                (forecast, index) => (
                  <div className="gallery-forecast-item" key={index}>
                    <img
                      className="gallery-forecast-icon"
                      src={getIcon(forecast.main.temp)}
                      alt={forecast.weather[0].description}
                      style={{ height: 80, width: 80 }}
                    />
                    <p>
                      <strong>{formatDateTime(forecast.dt_txt)}:</strong>{" "}
                      Temperature: {forecast.main.temp}°C (min:{" "}
                      {forecast.main.temp_min}°C, max: {forecast.main.temp_max}
                      °C)
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <>
            <Lottie
              options={defaultOptions}
              style={{ height: "90%", width: "100%" }}
            />
            <p style={{ textAlign: "center" }}>Loading..</p>
          </>
        )}
      </div>
    </>
  );
}

export default WeatherPrediction;
/**
 * 
       <div>
              {" "}
              <button id="previous" onClick={prev}>
                <ArrowLeftOutlined size={30} />
              </button>
              <button id="next" onClick={next}>
                <ArrowRightOutlined size={30} />
              </button>
            </div>         
             */
