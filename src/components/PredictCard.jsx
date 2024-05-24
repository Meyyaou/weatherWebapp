import React, { useState } from "react";
import "./WeatherCard.css";
import "./PredictCard.css";
import WeatherPrediction from "./WeatherPrediction";
import loadingImage from "../assets/loadingPredict.json";
import Lottie from "react-lottie";
function PredictCard() {
  const [predict, setPredict] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const handlePredictClick = () => {
    setLoading(true);
    // Perform any asynchronous tasks here if needed before displaying prediction
    // For example, fetching data or any other operations
    setTimeout(() => {
      setLoading(false);
      setPredict(true);
    }, 2000); // Simulating loading delay with setTimeout, replace with actual async operation
  };

  return (
    <>
      <p className="title-predict">Predict the weather:</p>
      <div id="predict">
        <div className="glass_card">
          {!predict && !loading && (
            <div className="btn-container">
              <button
                className="predict-btn"
                onClick={handlePredictClick}
              >
                Click to predict!
              </button>
            </div>
          )}
          <div className="max-w-lg">
            {loading && <Lottie 
	    options={defaultOptions}
        style={{height: "90%", width: "100%"}}
      />}
            {predict && <WeatherPrediction />}
          </div>
        </div>
      </div>
    </>
  );
}

export default PredictCard;
