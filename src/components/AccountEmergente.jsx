import React, { useState, useEffect } from "react";
import "./css/AccountEmergente.css";

const AccountEmergente = ({ popupClose, isVisible }) => {
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
  }, [isVisible]);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowPopup(true), 50); //retraso para activar la animacion
    } else {
      setTimeout(() => setShowPopup(false), 300);
    }
  }, [isVisible]);

  return (
      <div 
        className={`account-popup ${showPopup ? "popup-open" : "popup-close"}`}
      >
        <div className="account-popup__container">
          <h2 className="popup-title">Iniciar sesión</h2>
          <div className="account-popup__content">
            <label className="popup-text" htmlFor="correo">
              Ingresa tu correo
            </label>
            <input
              type="email"
              className="popup-input"
              id="correo"
              placeholder="Correo electrónico"
            />
            <button className="popup-button">
              <box-icon name="lock-alt" type="solid"></box-icon>
              Continuar
            </button>
          </div>

          <button className="popup-button__close" onClick={popupClose}>
            <box-icon name="x-circle"></box-icon>
          </button>
        </div>
      </div>
  );
};

export default AccountEmergente;
