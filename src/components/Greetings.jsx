import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDate } from "./UseDate";
function Greetings({ user }) {
  const [userName, setUserName] = useState('');
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState(''); 
  const [userPassword, setUserPassword] = useState(''); 
  
  useEffect(() => {
    if (user) {
      setUserId(user._id);
      setUserName(user.name);
      setAlertEnabled(user.alerts === 'enable');
      setSelectedType(user.type);
      setUserEmail(user.email); 
      setUserPassword(user.password); 
    }
  }, [user]);
  let greeting;
  const username="Salim"//{userName};
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
        {greeting} {username}!
      </h1>
    </div>
  );
}

export default Greetings;
