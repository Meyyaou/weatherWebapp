import React from "react";
import "./WeatherCard.css";
import "./PredictCard.css";
import WeatherPrediction from "./WeatherPrediction";
import { useState } from "react";
function PredictCard() {
  const [predict, setPredict] = useState(false);

  //add animation TODO
  return (
    <><p className="title-predict">Predict the weather:</p>
    <div id="predict">
      <div className="glass_card">
      {!predict && (
      <div className="btn-container">   
            <button 
            className="predict-btn"
            onClick={()=> {setPredict(true)}}
            >Click to predict!</button>
             </div>
          )}
          <div className="max-w-lg">
          {predict && <WeatherPrediction/> }
          </div>
      </div>
    </div>
    </>
  );
}

export default PredictCard;
