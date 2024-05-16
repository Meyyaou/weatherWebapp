import React from "react";
import "./PopupAdvice.css";
function PopupAdvice(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-popup-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupAdvice;
