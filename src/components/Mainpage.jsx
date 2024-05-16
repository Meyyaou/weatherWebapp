import { useState, useEffect } from "react";
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
import Test from "./Test.jsx";
function Mainpage({ user }) {
  const [userName, setUserName] = useState("");
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUserId(user._id);
      setUserName(user.name);
      setAlertEnabled(user.alerts === "enable");
      setSelectedType(user.type);
      setUserEmail(user.email);
      setUserPassword(user.password);
    }
  }, [user]);
  //TODO need to add use state par rapport au background
  //TODO add usestatecontext for weather display?
  const [backgroundState, setBackgroundState] = useState("cloudy");
  const [dataAvailable, setDataAvailable] = useState(true);
  //TODO add to displatybluetooth button change on true to generzte weather card
  //TODO arranger l'affichage depending on the displaybluetooth btn (including generaladvice)
  return (
    <div>
     {" "}
      <Greetings user={user} />
      {!dataAvailable && <DisplayBluetooth />}
      {dataAvailable && (
        <div>
          <Background backgroundState="cloudy" />
          <AdviceButton user={user} />
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
      <InfoWidget />
      <SunhourWidget />
      <div className="blank-bloc"></div>
      <GeneralAdvice />
      <div className="second-part-page">
        <AroundConstantine />

        <PredictCard />
      </div>
    </div>
  );
}

export default Mainpage;
/**   */
/**   
 */
