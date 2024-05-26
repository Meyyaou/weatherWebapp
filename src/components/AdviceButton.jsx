import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PopupAdvice from "./PopupAdvice";
import axios from 'axios';
import Lottie from "react-lottie";
import bulb from "../assets/advice.gif";

function AdviceButton({user, weatherState}) {
  const [advice, setAdvice] = useState("no advice");
  const [popupButton, setPopupButton] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [adviceWeather, setAdviceWeather]= useState("");
// weatherState="cloudy";
   // weatherState="rainy";

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setSelectedType(user.type);
      console.log("User type when user is present:", user.type);
    } else {
      console.log("No user found in local storage.");
    }
  }, []);

  const fetchRandomAdvice = async () => {
    if (!selectedType) {
      console.error('No type selected');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/randomAdvice/${selectedType}`, {
        params: { weatherState }
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      setAdvice(response.data.content);
      setAdviceWeather(weatherState);

    } catch (error) {
      console.error('Error fetching random advice:', error);
    }
  };

  
    const tooltipStyle = {
      zIndex: 3,
      textAlign: "center",
      position: "fixed",
      right: 30,
      bottom: 30,
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      transition: "transform 0.3s ease-in-out",
    };
  
   
  return (
    <div>
      <Tooltip
        title="Get an advice" arrow
        componentsProps={{
          tooltip: {
            sx: {
              fontSize: '1rem', 
              padding: '10px', 
              backgroundColor: "steelBlue",
              color: "white",  
            }
          },
          arrow: {
            sx: {
              color: "steelBlue"
            }
          }
        }}
        sx={{
          zIndex: 3,
          textAlign: "center",
          position: "fixed",
          right: 30,
          bottom: 30,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          '&:hover': {
            transform: 'scale(1.15)',
            transition: 'transform 0.3s ease-in-out',
          }
        }}
      >
        <IconButton
          color="primary"
          style={tooltipStyle}
          aria-label="get-advice"
          onClick={() => {
            fetchRandomAdvice();
            setPopupButton(true);
          }}
          
        >
          <TipsAndUpdatesIcon style={{marginLeft:"2px"}}/>
        </IconButton> 
       
      </Tooltip>
        
      <PopupAdvice trigger={popupButton} setTrigger={setPopupButton}>
        <h3 style={{ color: "black" }}>Your advice for a <u>{adviceWeather}</u> day as a <u>{selectedType}</u></h3>
        <p style={{ color: "black" }}>{advice}</p>
      </PopupAdvice>
    </div>
  );
}

export default AdviceButton;
/** 
                <img src={bulb} style={{height:"50px", width: "50px", borderRadius: "50%", position:"relative",top:"10%",bottom:0, float: "right", left:"20%"}}/>

        */