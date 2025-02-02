import React from "react";
import "./css/overlay.css";

const Overlay = ({isActive, onClick}) => {
  return isActive ? <div className="overlay" onClick={onClick}></div> : null;
};

export default Overlay;