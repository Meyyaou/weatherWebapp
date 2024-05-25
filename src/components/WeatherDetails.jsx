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

    function calculateDewPoint(temperature, humidity) {
        if (humidity <= 0 || humidity > 100) {
            console.error("Humidity should be between 0 and 100 (exclusive of 0)");
            return "?";
        }
    
        const a = 17.625;
        const b = 243.04;
    
        const alpha = Math.log(humidity / 100) + (a * temperature) / (b + temperature);
        const dewPoint = (b * alpha) / (a - alpha);
    
        return Math.round(dewPoint);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=Constantine&appid=3258acf3613370332f9694e6267b94a5&units=metric`
                );

                setWeatherData(response.data);
                setFeelsLike(response.data.main.feels_like);
                setVisibility(response.data.visibility/1000);
                setClouds(response.data.clouds.all);
                console.log("clouds are : ", clouds)
                setTemperature(response.data.main.temp);
                setHumidity(response.data.main.humidity);
                setDewPoint(calculateDewPoint(temperature, humidity));
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
                    {typeData === "visibility" && <h3 style={{textAlign:"center"}}>{visibility} km</h3>}
                    {typeData === "feels_like" && <h3 style={{textAlign:"center"}}>{feelsLike} °C</h3>}
                    {typeData === "cloud" && <h3 style={{textAlign:"center"}}>{clouds} %</h3>}
                    {typeData === "dew_point" && <h3 style={{textAlign:"center"}}>{dewPoint} °C</h3>}
                </>
            ) : (
                <p style={{ fontSize: "0.5em" }}>Loading weather data...</p>
            )}
        </>
    );
}

export default WeatherDetails;
