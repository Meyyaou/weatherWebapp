 
import React, { useEffect, useState } from "react";
import "./Mainpage.css";
import InfoWidget from "./InfoWidget.jsx";
import AdviceButton from "./AdviceButton.jsx";
import Background from "./Background.jsx";
import WeatherCard from "./WeatherCard.jsx";
import DisplayBluetooth from "./DisplayBluetooth.jsx";
import AroundConstantine from "./AroundConstantine.jsx";
import PredictCard from "./PredictCard.jsx";
import GeneralAdvice from "./GeneralAdvice.jsx";
import Greetings from "./Greetings.jsx";
import SunhourWidget from "./SunhourWidget.jsx";
import AlertModal from "./AlertModal.jsx"; 

function Mainpage({ user }) {
  const [userName, setUserName] = useState("");
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [weatherState, setWeatherState] = useState(""); 
  
  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setAlertEnabled(user.alerts === "enable");
      setSelectedType(user.type);
      setUserEmail(user.email);
      setUserPassword(user.password);
    }
  }, [user]);
  const [dataAvailable, setDataAvailable] = useState(() => {
    return localStorage.getItem("dataAvailable") === "true";
  });

  const toggleDataAvailability = () => {
    setDataAvailable(true);
    localStorage.setItem("dataAvailable", "true");
  };


  
  return (
    <div>
      <Greetings user={user} />
      {!dataAvailable && <DisplayBluetooth toggleDataAvailability={toggleDataAvailability} />}
      {dataAvailable && (
        <div>
          <Background onWeatherStateChange={setWeatherState}/>
          <AdviceButton user={user} weatherState={weatherState}/>
          <main className="weather-card-container">
            <WeatherCard
              temperature="..."
              humidity="..."
              windSpeed="23"
              pressure="9"
            />
          </main>
        </div>
      )}
      {dataAvailable && (
        <>
          <InfoWidget />
          <SunhourWidget />
          <div className="blank-bloc"></div>
          <GeneralAdvice />
          <div className="second-part-page">
            <AroundConstantine />
            <PredictCard />
          </div>
        </>
      )}
      <AlertModal user={user} /> 
    </div>
  );
}

export default Mainpage;