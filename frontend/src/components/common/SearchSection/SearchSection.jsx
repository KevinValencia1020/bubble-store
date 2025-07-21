"use client";
import React, { useState, useEffect, useRef } from "react";
import CallMadeIcon from "@mui/icons-material/CallMade";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import CircularProgress from '@mui/joy/CircularProgress';

const SearchSection = ({
  isActive,
  filteredResults = [],
  filteredCategories = [],
  closeSearch,
  isLoading,
  error,
  suggetions = [],
  isLoadingSuggetions,
}) => {
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

  let popularTags = ["Celulares", "Televisores", "Computadores", "Tablets"];

  if (!isVisible) return null;

  const productSuggetions = suggetions.filter((suggetion => suggetion.type === 'Producto'));

  return (
    <>
      <div
        ref={searchSectionRef}
        className={`search-section fixed top-16 left-0 bottom-0 w-full bg-color-secundario transition-all duration-300 ease-in-out z-40 ${
          isActive
            ? "translate-y-0 opacity-100"
            : "translate-y-full pointer-events-none opacity-0"
        }`}
        style={{height: "calc(100vh - 5rem - 5rem)"}}
      >
        <div className="h-full flex flex-col">

          <div
            className={`search-results flex-1 w-full overflow-y-auto transition-all duration-300 ease-in-out ${
              showSection
                ? "translate-x-0 opacity-100"
                : "translate-x-full pointer-events-none opacity-0"
            }`}
          >

            <div className="">
              {isLoading && (
                <CircularProgress variant='soft' size='md'/>
              )}
              {error && (
                <p>
                  {error}
                </p>
              )}
            </div>

            {/* Mostrar sugerencias solo si no esta en estado de error / carga de busqueda */}
            {!isLoading && !error && (isLoadingSuggetions || suggetions.length > 0) && (

              <div className="w-[90%] my-2 mx-auto">
                <p className="font-medium bg-color-primario w-max px-4 text-color-secundario rounded-md">
                  Sugerencias
                </p>
                
                {isLoadingSuggetions ? (

                  <CircularProgress variant='soft' size='md'/>

                ) : (

                  <ul className="mt-4 bg-white rounded">
                    {productSuggetions.map((suggetion, index) => (
                      <li 
                        key={index}
                        className="relative flex items-center justify-between p-1 border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <SearchIcon fontSize="medium" className="text-color-primario"/>
                          <Link
                            href={`/search?q=${encodeURIComponent(suggetion.suggestion || suggetion.term)}`}
                            onClick={closeSearch}
                          >
                            {suggetion.suggestion || suggetion.term}
                          </Link>

                        </div>

                        <CallMadeIcon fontSize="medium" className="text-color-primario"/>
                        
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {console.log(filteredCategories)}

            {!isLoading && !error && !isLoadingSuggetions && filteredCategories.length > 0 &&(

              <>

                <div className="w-[90%] my-2 mx-auto">

                    <div>

                      <p className="font-medium bg-color-primario w-max px-4 text-color-secundario rounded-md">Categorías</p>

                      <ul>

                        {filteredCategories.map((category) => (
                          
                          <li key={category} className="bg-gray-300 w-max px-2 rounded-md my-1">

                            <Link
                              href={`/search/${encodeURIComponent(category)}`}
                              onClick={closeSearch}
                            >
                              {category}
                            </Link>

                          </li>
                        ))}
                      </ul>

                    </div>
                </div>

                <div className="w-[90%] mt-4 mx-auto">

                  <p className="font-medium bg-color-primario w-max text-color-secundario px-4 rounded-md">
                    Productos
                  </p>

                  <ul className="results__ul mt-4 bg-white rounded">

                    {filteredResults.map((product) => (
                      <li
                        key={product.id}
                        className="results__li relative flex items-center justify-between p-1 border-b last:border-b-0"
                      >

                        <div className="flex items-center gap-2">
                          <SearchIcon
                            fontSize="medium"
                            className="text-color-primario"
                          />

                          <Link
                            href={`/product/${encodeURIComponent(
                              product.id
                            )}`}
                            onClick={closeSearch}
                          >
                            {product.name}
                          </Link>

                        </div>

                        <CallMadeIcon
                          fontSize="medium"
                          className="text-color-primario"
                        />

                      </li>

                    ))}

                  </ul>

                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSection;
