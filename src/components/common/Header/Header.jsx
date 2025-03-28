import React, { useEffect, useRef, useState } from "react";
import SearchSection from "../SearchSection/SearchSection";
import styleGlobal from "../../../styles/global.module.css";
import styleHeader from "./header.module.css";
import clsx from "clsx";

const HeaderMain = ({ activeTab, closeSearch, openSearch }) => {
  // estructura para tener el control en la caja de texto para darle utilidad a la X (clear)
  const [searchTerm, setSearchTerm] = useState("");

  const [isSearchActive, setIsSearchActive] = useState(true); //Estado para controlar la vista de busqueda

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (activeTab === "Buscar" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab]);

  const handleCloseSearch = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }

    closeSearch(); // Llama la funcion de cierre correctamente
  };

  // Si el tab activo es "Buscar", enfoca el input
  useEffect(() => {
    if (activeTab === "Buscar" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab]);

  // Cerrar la busqueda cuando el usuario cambia de tab
  useEffect(() => {
    if (activeTab !== "Buscar" && inputRef.current) {
      inputRef.current.blur();
    }
  }, [activeTab]);

  return (
    <>
      <header className="hero-main transition-all duration-300 w-full z-40">

        <section className="hero-primary relative flex justify-between items-center bg-color-primario w-full py-4 overflow-hidden">

          <div className={`hero-content relative flex justify-between items-center gap-2 ${styleGlobal.containerContent} transition-transform duration-300 ease-in-out`}>

            {/* Boton para cerrar la busqueda */}
            <button
              className={`close-search absolute top-1 left-0 transition-all duration-300 ease-in-out z-40 ${activeTab === "Buscar" ? "translate-x-0 opacity-100 -left-2" : "translate-x-full opacity-0"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCloseSearch();
              }}
            >
              <box-icon name="chevron-left"></box-icon>
            </button>
            {/* Logo se oculta cuando la busqueda esta activa */}

            <a
              href="#"
              className={`hero-logo text-color-secundario no-underline font-medium tracking-widest transition-opacity duration-300 ease-in-out ${
                activeTab === "Buscar"
                  ? "opacity-0 max-w-0"
                  : "opacity-100"
              }`}
            >
              BubbleStore
            </a>

            <form
              method="get"
              className={clsx(styleGlobal.containerContent, ["flex", "flex-nowrap", "justify-end", "items-center", "relative", "transition-all", "duration-300", "ease-in-out"],activeTab === "Buscar" && styleHeader.heroFormActive)}
            >
              <input
                type="text"
                id="buscar"
                placeholder="¿Que estas buscando?"
                autoComplete="off"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => {
                  openSearch();
                }}
                ref={inputRef}
                className={`${styleHeader.heroInput} relative w-[90%] border-none outline-none p-1 pr-9 pl-2 rounded-2xl transition-all duration-300 ease-in-out`}
              />

              <button
                className={`${styleHeader.heroButton} ${styleHeader.heroButtonSearch}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsSearchActive(true);
                }}
              >
                <box-icon name="search"></box-icon>
              </button>

              {searchTerm && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className={`${styleHeader.heroButton} ${styleHeader.heroButtonClear}`}
                >
                  <box-icon name="x"></box-icon>
                </button>
              )}
            </form>
          </div>
        </section>
      </header>



      <SearchSection
        isActive={activeTab === "Buscar"}
        closeSearch={handleCloseSearch}
        isExpanded={activeTab}
      />
    </>
  );
};

export default HeaderMain;