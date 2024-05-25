import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDate } from "./UseDate";
function Greetings({ user }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Load user data from local storage on initial render
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (storedUser && storedUser.name) {
        setUserName(storedUser.name);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  //TODO make sure it displays changed username too! 
  // even after refreshing the page !
  let greeting;
  let { time } = useDate();
  if (time < 12) {
    greeting = "Good morning";
  } else if (time < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening,";
  }

  return (
    <div className="greeting-container">
      <h1
        style={{
          fontSize: 30,
          marginLeft: 150,
          marginTop: 15,
          padding: 0,
          marginBottom: 0,
        }}
      >
        <style>
          {`
          @media (max-width: 600px) {
            /* Adjust font size for smaller screens */
            h1 {
                display: none;
            }
          }
        `}
        </style>
        {greeting} {userName}!
      </h1>
    </div>
  );
}

export default Greetings;
