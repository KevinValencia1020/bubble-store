import React, { useState } from "react";
import "./css/Header.css";
import Navbar from "./Navbar";

const HeaderMain = () => {
  // estructura para tener el control en la caja de texto para darle utilidad a la X
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <>
      <header className="hero-main">
        <section className="hero-primary">
          <div className="hero-content">
            <a href="#" className="hero-logo">
              BubbleStore
            </a>

            <form method="get" className="hero-form">
              <input
                type="search"
                id="buscar"
                placeholder="¿Que estas buscando?"
                autoComplete="off"
                value={searchTerm}
                onChange={handleInputChange}
                className="hero-input"
              />

              <button className="hero-button hero-button__search">
                <box-icon name="search"></box-icon>
              </button>

              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="hero-button hero-button__clear"
                >
                  <box-icon name="x"></box-icon>
                </button>
              )}
            </form>
          </div>
        </section>

        <Navbar/>
      </header>
    </>
  );
};

export default HeaderMain;
