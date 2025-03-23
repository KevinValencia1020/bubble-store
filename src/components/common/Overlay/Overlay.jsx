import React from "react";
// import "../styles/overlay.css";

const Overlay = ({isActive, onClick}) => {
  return(
    <div className={`overlay fixed top-0 left-0 w-full h-screen bg-black z-30 transition-opacity duration-300 ease-in-out ${isActive ? "opacity-50" : "opacity-0 cursor pointer-events-none"}`} 
    onClick={onClick}>
    </div>
  );

};

export default Overlay;