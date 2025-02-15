import React, { useState, useEffect, useRef } from "react";
import "./css/searchSection.css";

const SearchSection = ({ isActive }) => {
  const [showSection, setShowSection] = useState(false);

  const searchSectionRef = useRef(null);

  useEffect(() => {
    // Retraso breve para activar la transicion
    setTimeout(() => setShowSection(true), 50);
    /* Nota: Al cerrar (cuando closeSearch es llamado desde Header), 
    la clase se cambia en Header y la animación se maneja en CSS.*/
  }, []);

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
