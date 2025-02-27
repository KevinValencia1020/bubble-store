import React, { useEffect, useRef, useState } from "react";
import "../styles/header.css";
import SearchSection from "./SearchSection";

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
      <header className="hero-main">
        <section className="hero-primary">
          <div className={`hero-content`}>
            {/* Boton para cerrar la busqueda */}
            <button
              className={`close-search ${activeTab === "Buscar" ? "close-search__open" : "close-search__close"}`}
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
              className={`hero-logo ${
                activeTab === "Buscar"
                  ? "hero-logo__active"
                  : "hero-logo__close"
              }`}
            >
              BubbleStore
            </a>
            {/*})}*/}
            <form
              method="get"
              className={`hero-form ${activeTab === "Buscar" ? "active" : ""}`}
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
                className={`hero-input`}
              />

              <button
                className={`hero-button hero-button__search ${
                  activeTab === "Buscar" ? "active" : ""
                }`}
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
                  className="hero-button hero-button__clear"
                >
                  <box-icon name="x"></box-icon>
                </button>
              )}
            </form>
          </div>
        </section>
      </header>

      {/* {activeTab === "Buscar" && ( */}

      <SearchSection
        isActive={activeTab === "Buscar"}
        closeSearch={handleCloseSearch}
        isExpanded={activeTab}
      />
      {/* )} */}
    </>
  );
};

export default HeaderMain;