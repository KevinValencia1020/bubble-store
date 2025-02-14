import React from "react";
import "./css/overlay.css";

const Overlay = ({isActive, onClick}) => {
  return(
    <div className={`overlay ${isActive ? "overlay-open" : "overlay-close"}`} 
    onClick={onClick}>
    </div>
  );

};

export default Overlay;