import React, { useState, useEffect } from 'react';
import './account.css';

function Account({ user, onClose }) {
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

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleAlertToggle = () => {
    setAlertEnabled(!alertEnabled);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleUserNameClick = () => {
    setIsEditingName(true);
  };

  const handleUserNameBlur = () => {
    setIsEditingName(false);
  };

  const handleSave = () => {
    if (oldPassword && oldPassword !== userPassword) {
      alert('Old password is incorrect.');
      return;
    }
    const userDataToUpdate = {
      name: userName,
      alerts: alertEnabled ? 'enable' : 'disable',
      type: selectedType,
      email: userEmail, 
      password: newPassword ? newPassword : userPassword,
    };

    fetch(`http://localhost:5000/updateUserByEmail/${userEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataToUpdate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User data updated successfully:', data);
        setUserPassword(newPassword ? newPassword : userPassword);
        
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        
      });
  };

  return (
    <div className="account-container">
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <div className="profile-section">
        {/* Nom modifiable */}
        <div className="profile-name" onClick={handleUserNameClick}>
          <label htmlFor="userName">Name:</label>
          {isEditingName ? (
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
              onBlur={handleUserNameBlur}
              autoFocus
            />
          ) : (
            <span>{userName}</span>
          )}
        </div>
      </div>
      {/* Section Alertes */}
      <div className="alert-section">
        <label>Alerts:</label>
        <button
          className={alertEnabled ? 'enable-button' : 'disable-button'}
          onClick={handleAlertToggle}
        >
          {alertEnabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>
      {/* Section Changement de mot de passe */}
      <div className="password-section">
        <label htmlFor="oldPassword">Old Password:</label>
        <input
          placeholder="Enter your password"
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
        <label htmlFor="newPassword">New Password:</label>
        <input
          placeholder="Enter new password"
          type="password"
          id="newPassword"
          onChange={handleNewPasswordChange}
        />
      </div>
      {/* Section Choix de type */}
      <div className="type-section">
        <label htmlFor="type">Type:</label>
        <select id="type" value={selectedType} onChange={handleTypeChange}>
          <option value="student">Student</option>
          <option value="airline-worker">Airline Worker</option>
          <option value="agriculture-worker">Agriculture Worker</option>
          <option value="driver">Driver</option>
        </select>
      </div>
      {/* Bouton de sauvegarde */}
      <button className="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default Account;


