import React, { useState, useEffect, useRef } from "react";
import "./css/AccountEmergente.css";

const AccountEmergente = ({ popupClose, isVisible }) => {
  const popupRef = useRef(null); //Referenciamos la ventana emergente

  // Esta sirve para evitar la interactividad que no sea con la ventana
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
  }, [isVisible]);

  const [showPopup, setShowPopup] = useState(false); //destructuracion para la animacion de la ventana emergente [variable, funcion del estado]

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowPopup(true), 50); //retraso para activar la animacion
    } else {
      setTimeout(() => setShowPopup(false), 300);
    }
  }, [isVisible]);

  return (
    <div
      className={`account-popup popup-container ${
        showPopup ? "popup-open" : "popup-close"
      }`}
    >
      <div className="account-popup__container">
        <h2 className="popup-title">Iniciar sesión</h2>
        <div className="account-popup__content">
          <label className="popup-text" htmlFor="correo">
            Ingresa tu correo
          </label>

          <div className="input-container">
            <input
              type="email"
              className="popup-input"
              id="correo"
              placeholder=""
              required
            />
            <label htmlFor="correo" className="popup-label">
              Correo electrónico
            </label>
          </div>
          <button className="popup-button">
          <box-icon name='lock' color="var(--color-secundary)"></box-icon>
          Continuar
          </button>
        </div>

        <button
          className="popup-button__close"
          onClick={(e) => {
            e.stopPropagation();
            popupClose();
          }}
        >
          <box-icon name="x-circle"></box-icon>
        </button>
      </div>
    </div>
  );
};

export default AccountEmergente;
