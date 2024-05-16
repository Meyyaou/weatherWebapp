import React from 'react'
import "./DisplayBluetooth.css"

function DisplayBluetooth() {
  //recuperer val of display : 
  const [isChecked, setIsChecked] = React.useState(false);
  const handleToggleEvent = () => {
    setIsChecked(!isChecked);
};

  return (
    <div className='container-btn'>
      <button className="display-btn" onClick={handleToggleEvent} checked={isChecked}>Activate bluetooth to get started !</button>
    </div>
  )
}

export default DisplayBluetooth
