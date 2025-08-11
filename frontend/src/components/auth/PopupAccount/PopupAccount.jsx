import React, { useState, useEffect, useRef } from "react";
import styleGlobal from "../../../styles/global.module.css";
import style from "./popupAccount.module.css";
import { loginUser } from "@/utils/api";

const PopupAccount = ({ popupClose, isVisible }) => {
  const popupRef = useRef(null); //Referenciamos la ventana emergente

  // Esta sirve para evitar la interactividad que no sea con la ventana
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
  }, [isVisible]);

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowPopup(true), 100); //retraso para activar la animacion
    } else {
      setTimeout(() => setShowPopup(false), 100);
      setEmailError(""); // Limpiar error de correo al cerrar popup
      setEmail("")
      setPasswordError(""); // Limpiar error de contraseña al cerrar popup
      setPassword("");
      setServerError(""); // Limpiar error de servidor al cerrar popup
    }
  }, [isVisible]);

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Solo login y redirección a registro si el usuario no existe
  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!email.trim()) {
      setEmailError("Correo no válido");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Correo no válido");
      return;
    }
    setEmailError("");
    if (!password.trim()) {
      setPasswordError("La contraseña es obligatoria");
      return;
    }
    setPasswordError("");
    setLoading(true);

  try {
      const data = await loginUser({ email, password });
      // Si el login es exitoso, guardamos el token y los datos del usuario en localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Disparar evento personalizado para notificar login
        window.dispatchEvent(new Event("userLogin"));
        // Cerrar popup y redirigir al home
        try { popupClose(); } catch(_) {}
        window.location.replace('/');
      } else if (data.redirectToRegister) {
        window.location.href = `/register?email=${encodeURIComponent(email)}`;
      } else {
        setServerError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      // Diferenciar tipos de error
      if (err.status === 404 && (err.payload?.redirectToRegister || /Usuario no registrado/i.test(err.message))) {
        window.location.href = `/register?email=${encodeURIComponent(email)}`;
        return;
      }
      if (err.status === 401) {
        setServerError("Credenciales incorrectas");
        setPassword("");
        return;
      }
      if (err.status === 400) {
        setServerError(err.message || "Solicitud inválida");
        return;
      }
      setServerError(err.message || "No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
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

            <div className="input-container relative my-6">
              <input
                type="email"
                className={`popup-input w-full p-2 outline-none border border-gray-300 rounded transition-all duration-300 focus:border-color-primario ${style.popupInput}`}
                id="login-email"
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
                    setEmailError("Correo no válido");
                  } else {
                    setEmailError("");
                  }
                }}
              />
              <label htmlFor="login-email" className={`popup-label absolute top-2 left-2 text-gray-400 pointer-events-none transition-all duration-300 ease-in-out ${style.popupLabel}`}> 
                Correo electrónico
              </label>
              {emailError && (
                <span className="error-message absolute top-10 left-2 block text-red-500 text-xs mt-1 transition duration-300 ease-in-out">{emailError}</span>
              )}
            </div>
            <div className="input-container relative mt-12">
              <input
                type="password"
                className={`popup-input w-full p-2 outline-none border border-gray-300 rounded transition-all duration-300 focus:border-color-primario ${style.popupInput}`}
                id="login-password"
                placeholder=""
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              <label htmlFor="login-password" className={`popup-label absolute top-2 left-2 text-gray-400 pointer-events-none transition-all duration-300 ease-in-out ${style.popupLabel}`}>
                Contraseña
              </label>
              {passwordError && (
                <span className="error-message absolute top-10 left-2 block text-red-500 text-xs mt-1 transition duration-300 ease-in-out">{passwordError}</span>
              )}
            </div>
            <button
              className="popup-button w-full p-4 flex items-center justify-center gap-2 my-0 mx-auto bg-color-primario rounded text-color-secundario font-semibold mt-9"
              onClick={handleLogin}
              disabled={loading}
            >
              <box-icon name="lock" color="var(--color-secundary)"></box-icon>
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
            {serverError && (
              <span className="error-message block text-red-500 text-xs mt-2 transition duration-300 ease-in-out">{serverError}</span>
            )}
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
