import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

//TODO gerer l'error http 400
function Sunhour({city}) {
    const [sunriseTime, setSunriseTime] = useState('');
    const [sunsetTime, setSunsetTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3258acf3613370332f9694e6267b94a5`
            );
    
            setWeatherData(response.data);
            const sunriseTimestamp = response.data.sys.sunrise * 1000; // Convert to milliseconds
            const sunsetTimestamp = response.data.sys.sunset * 1000; // Convert to milliseconds
            const sunrise = new Date(sunriseTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const sunset = new Date(sunsetTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setSunriseTime(sunrise);
            setSunsetTime(sunset);
    
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
    
    return (
    <>
    {sunriseTime && sunsetTime &&
    <>
    <p className="sunrise-hour" >{sunriseTime}</p>
      <p className='sunset-hour'>{sunsetTime}</p>
    
    </>}
    {!sunriseTime && !sunsetTime &&
    <h2 style={{fontSize: "1.3em", position: "absolute", bottom: 50, left: 50}}>Preparing to fetch data...</h2>
    }
  
   </>
  )
}

export default Sunhour