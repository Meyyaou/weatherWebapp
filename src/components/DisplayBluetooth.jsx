import React from 'react'
import "./DisplayBluetooth.css"

function DisplayBluetooth({ toggleDataAvailability }) {
  const handleToggleEvent = () => {
    // Call the function passed from the parent to toggle data availability
    toggleDataAvailability();
  };

  return (
    <div className='container-btn'>
      <button className="display-btn" onClick={handleToggleEvent}>Plug in the cable to get started !</button>
    </div>
  );
}

export default DisplayBluetooth
