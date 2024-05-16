import React, { useEffect, useState } from "react";
import axios from "axios";
const Weather = ({typeData}) => {
  const [weatherData, setWeatherData] = useState(null);
//TODO add here all depending on typeData

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=36.3650&lon=6.6147&appid=3258acf3613370332f9694e6267b94a5
        `
      );
      
      setWeatherData(response.data);
     
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };


 
    fetchData();
  }, []);



  return (
    
    <div>
      {weatherData ? 
      (
        
        <>{typeData=="pressure" &&
          <p>{weatherData.main.pressure} hPa</p>
      }
      {typeData=="windSpeed" &&
    <p>{weatherData.wind.speed} m/s</p>
    }{typeData=="feels_like"&&
    <p>{weatherData.main.feels_like} °C</p>
    } 
        </>
      ) : (
        <p style={{fontSize: "0.5em"}}>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;