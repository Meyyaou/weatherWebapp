import React from "react";
import "./GeneralAdvice.css";
import goals from '../assets/goal.png';
import exercise from '../assets/exercise.png';
import happy from '../assets/happy-face.png';
import learn from '../assets/machine-learning.png';
import breaks from '../assets/coffee-break.png';
import balance from '../assets/balance.png';
function GeneralAdvice() {
  return (
    <>
      <p className="title">General advice:</p>
      <div className="gr-container">
        <div className="gr-it">
          <img src={exercise} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto', marginTop: "2px"}}/>
          <p className="advice">
            Exercise and eat healthily for overall wellness.
          </p>
        </div>
        <div className="gr-it">
        <img src={happy} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <p className="advice">
            Stay positive and grateful for resilience and happiness.
          </p>
        </div>
        <div className="gr-it">
        <img src={learn} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <p className="advice">Keep learning to adapt and stay competitive.</p>
        </div>
        <div className="gr-it">
        <img src={breaks} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <p className="advice">Take breaks for physical and mental rest.</p>
        </div>
        <div className="gr-it">
        <img src={goals} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <p className="advice">Review goals regularly to stay focused.</p>
        </div>
        <div className="gr-it">
        <img src={balance} style={{height: "40px", width: "40px", display:"block", marginLeft: 'auto', marginRight: 'auto'}}/>
          <p className="advice">Balance work and life for well-being.</p>
        </div>
      </div>
    </>
  );
}

export default GeneralAdvice;
