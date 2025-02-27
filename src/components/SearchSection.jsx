import React, { useState, useEffect, useRef } from "react";
import "../styles/searchSection.css";

const SearchSection = ({ isActive }) => {
  const [showSection, setShowSection] = useState(false);
  const [isVisible, setIsVisible] = useState(isActive);

  const searchSectionRef = useRef(null);

  useEffect(() => {

    if (isActive) {
      setIsVisible(true); //Muestra el componente en el DOM
      // Retraso breve para activar la transicion
      setTimeout(() => setShowSection(true), 50);
    } else {
      setShowSection(false); //Animacion de salida
      setTimeout(() => setIsVisible(false), 300); // Desmonta el componente despues de 300ms
    }
    /* Nota: Al cerrar (cuando closeSearch es llamado desde Header), 
    la clase se cambia en Header y la animación se maneja en CSS.*/
  }, [isActive]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={searchSectionRef}
        className={`search-section ${
          isActive ? "search-open" : "search-close"
        }`}
      >
        <div className="search-container">
          <div className={`search-results ${showSection ? "search-results__open" : "search-results__close"}`}>
            <div className="popular-searches">
              <p className="popular-title">Lo más buscado</p>

              <div className="popular-tags">
                <span className="popular-tag">Celulares</span>

                <span className="popular-tag">Televisores</span>

                <span className="popular-tag">Computadores</span>

                <span className="popular-tag">Tablest</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSection;
