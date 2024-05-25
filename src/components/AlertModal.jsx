import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AlertModal.css";
import Lottie from "react-lottie";
import alertImg from "../assets/alert.json";

const AlertModal = ({ user, alertEnabled }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const optalert = {
    loop: true,
    autoplay: true,
    animationData: alertImg,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    if (user && user.alerts === "enable") {
     alertEnabled=true;
    }
  }, [user]);

  useEffect(() => {
    if (alertEnabled) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=36.3650&lon=6.6147&appid=68302dbe8e1cd917f19ec87d0956d2b7&units=metric`
          );
          const weatherData = response.data;
          const temp = weatherData.main.temp;
          const humidity = weatherData.main.humidity;

          if (temp >= 30 || humidity >= 80 || temp < 0 ) {
            setShowAlert(true);
            setAlertMessage(
              `Attention! Extreme weather conditions: ${temp}°C and ${humidity}% humidity.`
            );
          } else {
            setShowAlert(false);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      fetchWeatherData();
    }
  }, [alertEnabled]);

  if (!showAlert) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
      <Lottie
            style={{
              height: "40px",
              width: "50px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            options={optalert}
          />
        <span className="close" onClick={() => setShowAlert(false)}>&times;</span>
        <p>{alertMessage}</p>
      </div>
    </div>
  );
};

export default AlertModal;
