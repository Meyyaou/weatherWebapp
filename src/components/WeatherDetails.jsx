import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherDetails({ typeData }) {
    const [weatherData, setWeatherData] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    const [visibility, setVisibility] = useState(null);
    const [clouds, setClouds]= useState(null);
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

                </>
            ) : (
                <p style={{ fontSize: "0.5em" }}>Loading weather data...</p>
            )}
        </>
    );
}

export default WeatherDetails;
