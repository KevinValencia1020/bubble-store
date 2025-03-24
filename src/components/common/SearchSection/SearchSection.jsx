import React, { useState, useEffect, useRef } from "react";
import styleGlobal from "../../../styles/global.module.css";

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
      setShowSection(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // Desmonta el componente despues de 300ms
    }
    /* Nota: Al cerrar (cuando closeSearch es llamado desde Header), 
    la clase se cambia en Header y la animación se maneja en CSS.*/
  }, [isActive]);

  let popularTags = ["Celulares", "Televisores", "Computadores", "Tablets"]

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={searchSectionRef}
        className={`search-section absolute top-16 left-0 w-full h-screen bg-color-secundario transition-all duration-300 ease-in-out z-40 ${
          isActive ? "translate-y-0 opacity-100" : "translate-y-full pointer-events-none opacity-0"
        }`}
      >
        <div className={styleGlobal.containerContent}>
          <div className={`search-results mt-4 transition-all duration-300 ease-in-out ${showSection ? "translate-x-0 opacity-100" : "translate-x-full pointer-events-none opacity-0"}`}>

            <div className="popular-searches text-sm font-semibold mb-2">

              <p className="popular-title font-semibold text-lg">Lo más buscado</p>

              <div className="popular-tags flex flex-wrap gap-2 mt-3">

                {popularTags.map((tag, index) => 

                <span key={index} className="popular-tag bg-gray-200 px-3 rounded text-sm">{tag}</span>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSection;
