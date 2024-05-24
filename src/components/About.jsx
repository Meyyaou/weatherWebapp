import React from "react";
import "./About.css";
import Lottie from 'react-lottie';
import pic from "../assets/team-work.json";
function About() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: pic,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
  return (
    <div className="container-about">
      <div className="about-content">
        <div className="image-about">
        <Lottie 
	    options={defaultOptions}
        style={{height: "90%", width: "100%"}}
      />
        </div>

        <div className="content">
          <h1 className="title_about">About Us</h1>
          
          <p>
            Welcome to <strong>Taksantina</strong>, your go-to{" "}
            <strong>weather monitoring</strong> website utilizing{" "}
            <strong>IoT technology</strong> for precise, real-time
            meteorological insights. Our advanced sensor systems provide instant
            access to accurate weather data, helping you make informed
            decisions. Taksantina offers tailored forecasts through{" "}
            <strong>customized prediction</strong>
            algorithms, analyzing historical data and specific variables like
            location and occupation. We provide{" "}
            <strong> personalized advisories and tips</strong>
            based on real-time data, helping you manage weather-related
            challenges effectively. Our user-friendly interface ensures easy
            access and interpretation of weather information across various
            devices. Additionally, our{" "}
            <strong> real-time environmental alert</strong> system monitors
            temperature and humidity, giving you proactive alerts for
            significant deviations.
          </p>
          <a href="" className="readmore">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
/**<h3 className="subtitle_about"> Experience the future of weather monitoring
            with Taksantina, where advanced technology meets simplicity!</h3> */