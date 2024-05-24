import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PopupAdvice from "./PopupAdvice";
import axios from 'axios';

function AdviceButton({user, weatherState}) {
  const [advice, setAdvice] = useState("no advice");
  const [popupButton, setPopupButton] = useState(false);
  const [selectedType, setSelectedType] = useState('');

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
    } catch (error) {
      console.error('Error fetching random advice:', error);
    }
  };

  return (
    <div>
      <Tooltip
        title="Get an advice" arrow
        style={{
          zIndex: 3,
          textAlign: "center",
          position: "fixed",
          right: 30,
          bottom: 30,
          backgroundColor: "white", 
        }}
      >
        <IconButton
          color="info"
          aria-label="get-advice"
          onClick={() => {
            fetchRandomAdvice();
            setPopupButton(true);
          }}
        >
          <LightbulbIcon />
        </IconButton>
      </Tooltip>
        
      <PopupAdvice trigger={popupButton} setTrigger={setPopupButton}>
        <h3 style={{ color: "black" }}>{selectedType}</h3>
        <p style={{ color: "black" }}>{advice}</p>
      </PopupAdvice>
    </div>
  );
}

export default AdviceButton;
