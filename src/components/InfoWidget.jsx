import React from "react";
import "./InfoWidget.css";
import WeatherDetails from "./WeatherDetails";
import cloud from "../assets/Clouds (1).json";
import dew from "../assets/Thermometer (1).json";
import feel from "../assets/Celsius (1).json";
import visible from "../assets/Eye.json";
import Lottie from "react-lottie";

function InfoWidget() {
  const optdew = {
    loop: true,
    autoplay: true,
    animationData: dew,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const optfeel = {
    loop: true,
    autoplay: true,
    animationData: feel,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const optvisible = {
    loop: true,
    autoplay: true,
    animationData: visible,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const optcloud = {
    loop: true,
    autoplay: true,
    animationData: cloud,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <p className="title-info">Info:</p>
      <div className="small-grid-container">
        <div className="small-grid-item">
          <Lottie
            style={{
              height: "40px",
              width: "50px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            options={optdew}
          />
          <WeatherDetails
            typeData="dew_point"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <p>Dew Point</p>
        </div>
        <div className="small-grid-item">
          <Lottie
            style={{
              height: "40px",
              width: "50px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            options={optfeel}
          />{" "}
          <WeatherDetails
            typeData="feels_like"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <p>Feels Like</p>
        </div>
        <div className="small-grid-item">
          <Lottie
            style={{
              height: "40px",
              width: "60px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            options={optcloud}
          />{" "}
          <WeatherDetails
            typeData="cloud"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <p>Clouds</p>
        </div>
        <div className="small-grid-item">
        <Lottie
            style={{
              height: "40px",
              width: "50px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            options={optvisible}
          />
          <WeatherDetails
            typeData="visibility"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <p>Visibility</p>
        </div>
      </div>
    </>
  );
}

export default InfoWidget;
