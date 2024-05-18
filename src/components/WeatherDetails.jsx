import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherDetails({ typeData }) {
    const [weatherData, setWeatherData] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    const [visibility, setVisibility] = useState(null);
    const [clouds, setClouds]= useState(null);
    const [temperature, setTemperature]= useState(null);
    const[humidity, setHumidity]=useState(null);
    const[dewPoint, setDewPoint]=useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=Constantine&appid=3258acf3613370332f9694e6267b94a5&units=metric`
                );

                setWeatherData(response.data);
                setFeelsLike(response.data.main.feels_like);
                setVisibility(response.data.visibility);
                setClouds(response.data.clouds.all);
                setTemperature(response.data.main.temp);
                setHumidity(response.data.main.humidity);
                setDewPoint(Math.round(243.04 * (Math.log(humidity/100)+ 17.625*temperature/(243.04+temperature))/(17.625 - (Math.log(humidity/100)+ 17.625*temperature/(243.04+temperature)))));
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
                    {typeData === "visibility" && <h3 style={{textAlign:"center"}}>{visibility} m</h3>}
                    {typeData === "feels_like" && <h3 style={{textAlign:"center"}}>{feelsLike} °C</h3>}
                    {typeData === "cloud" && <h3 style={{textAlign:"center"}}>{clouds} %</h3>}
                    {typeData === "dew_point" && <h3 style={{textAlign:"center"}}>{dewPoint} %</h3>}
                </>
            ) : (
                <p style={{ fontSize: "0.5em" }}>Loading weather data...</p>
            )}
        </>
    );
}

export default WeatherDetails;
