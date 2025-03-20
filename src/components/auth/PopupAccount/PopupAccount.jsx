import React, { useState, useEffect, useRef } from "react";
import styleGlobal from "../../../styles/global.module.css";
import style from "./popupAccount.module.css";

const PopupAccount = ({ popupClose, isVisible }) => {
  const popupRef = useRef(null); //Referenciamos la ventana emergente

  // Esta sirve para evitar la interactividad que no sea con la ventana
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
  }, [isVisible]);

  const [showPopup, setShowPopup] = useState(false); //destructuracion para la animacion de la ventana emergente [variable, funcion del estado]
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowPopup(true), 100); //retraso para activar la animacion
    } else {
      setTimeout(() => setShowPopup(false), 100);
    }
  }, [isVisible]);

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <>
      <div
        ref={popupRef}
        className={`account-popup container fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full h-3/5 my-0 mx-auto bg-color-secundario rounded-t-3xl shadow-menu-shadow z-40 transition-all duration-300 ease-in-out popup-container ${
          showPopup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className="account-popup__container flex flex-col items-center mt-5">
          <h2 className="popup-title my-0 mx-auto text-xl font-bold text-gray-800">Iniciar sesión</h2>
          
          <div className={`account-popup__content ${styleGlobal.containerContent} text-start mt-5`}>
            <label className="popup-text" htmlFor="correo">
              Ingresa tu correo
            </label>

            <div className="input-container relative my-6">
              <input
                type="email"
                className={`popup-input w-full p-2 outline-none border border-gray-300 rounded transition-all duration-300 focus:border-color-primario ${style.popupInput}`}
                id="correo"
                placeholder=""
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                onBlur={() => {
                  if (!email.trim()) {
                    setEmailError("Correo no válido");
                  } else if (!validateEmail(email)) {
                    setEmailError("Correro no válido");
                  } else {
                    setEmailError("");
                  }
                }}
              />
              <label htmlFor="correo" className={`popup-label absolute top-2 left-2 text-gray-400 pointer-events-none transition-all duration-300 ease-in-out ${style.popupLabel}`}>
                Correo electrónico
              </label>

              {emailError && (
                <span className="error-message absolute top-10 left-2 block text-red-500 text-xs mt-1 transition duration-300 ease-in-out">{emailError}</span>
              )}
            </div>
            <button className="popup-button w-full p-4 flex items-center justify-center gap-2 my-0 mx-auto bg-color-primario rounded text-color-secundario font-semibold mt-9">
              <box-icon name="lock" color="var(--color-secundary)"></box-icon>
              Continuar
            </button>
          </div>

          <button
            className="popup-button__close absolute top-2 right-2 bg-transparent border-none"
            onClick={(e) => {
              e.stopPropagation(); //Detiene la propagación del evento
              popupClose();
            }}
          >
            <box-icon name="x-circle"></box-icon>
          </button>
        </div>
      </div>
    </>
  );
};

export default PopupAccount;
