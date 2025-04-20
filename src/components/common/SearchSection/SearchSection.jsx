"use client";
import React, { useState, useEffect, useRef } from "react";
import styleGlobal from "../../../styles/global.module.css";
import CallMadeIcon from '@mui/icons-material/CallMade';
import SearchIcon from '@mui/icons-material/Search';
const SearchSection = ({ isActive, filteredResults = [] }) => {

  // Estado para controlar la visibilidad de la sección de búsqueda
  const [showSection, setShowSection] = useState(false);

  // Estado para controlar la animación de entrada/salida
  const [isVisible, setIsVisible] = useState(isActive);

  const searchSectionRef = useRef(null);

  useEffect(() => {

    if (isActive) {
      setIsVisible(true); //Muestra el componente en el DOM
      // Retraso breve para activar la transicion

      setTimeout(() => setShowSection(true), 50);

      document.body.style.overflow = "hidden"; // Desactiva el scroll del body 

    } else {

      setShowSection(false);

      setTimeout(() => {

        setIsVisible(false);

      }, 300); // Desmonta el componente despues de 300ms

      document.body.style.overflow = ""; // Activa el scroll del body
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

            <div className="search-input mt-4">

              {filteredResults.length > 0 && (

                <ul className="results__ul mt-4 bg-white rounded shadow-md p-2">

                  {filteredResults.map((product) => (

                    <li key={product.id} className="results__li relative flex items-center justify-between p-1 border-b last:border-b-0">

                      <div className="flex items-center gap-2">

                        <SearchIcon fontSize="medium"
                          className="text-color-primario"

                        />
                        <span className="text-color-texto text-sm">{product.name}</span>
                        
                      </div>

                      <CallMadeIcon fontSize="medium" className="text-color-primario"/>

                    </li>

                  ))}

                </ul>

              )}

            </div>

          </div>

        </div>

      </div>
      
    </>
  );
};

export default SearchSection;
