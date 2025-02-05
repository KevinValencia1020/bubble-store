import React, { useState, useRef, useEffect } from "react";
import AccountEmergente from "./AccountEmergente";
import SearchSection from "./SearchSection";
import Overlay from "./overlay";
import "./css/Navbar.css";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState(""); // destructuracion para las propiedades del mapeo de hero-list
  const lineRef = useRef(null); //referenciar la linea
  const navRef = useRef(null); //referenciar el contendor de nav

  //Estado para controlar AccountEmergente
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Maneja la apertura/cierre de los tabs del nav dinamicamente
  const handleTabClick = (label) => {
    if (label === "Mi cuenta") {
      setIsAccountOpen(!isAccountOpen);
      setIsSearchOpen(false); //Cierra la busqueda si esta abierta
      setActiveTab(isAccountOpen ? null : label);

    } else if (label === "Buscar") {
      setIsSearchOpen(!isSearchOpen);
      setIsAccountOpen(false); //Cierra "Mi cuenta" si esta abierta
      setActiveTab(isSearchOpen ? null : label);

    } else if (label === "Categorías") {
      setIsAccountOpen(false);
      setIsSearchOpen(false);

    } else if (label === "Mi carrito") {
      setIsAccountOpen(false);
      setIsSearchOpen(false);
    } else {
      setIsAccountOpen(false);
      setIsSearchOpen(false);

      setActiveTab(activeTab === label ? null : label);
    }
  };

  useEffect(() => {
    if (activeTab && lineRef.current) {
      const activeLineElement = document.querySelector(".hero-list.active");

      if (activeLineElement) {
        const { offsetWidth, offsetLeft } = activeLineElement;

        lineRef.current.style.width = `${offsetWidth}px`;
        lineRef.current.style.transform = `translateX(${offsetLeft}px)`;
        lineRef.current.style.opacity = "1";
      }
    } else {
      lineRef.current.style.opacity = "0";
      lineRef.current.style.width = "0";
    }
  }, [activeTab]);

  // controla el click fuera del contenedor de nav y la ventana emergente
  useEffect(() => {
    const handleClickOutSide = (event) => {
      // Verifica si el clic ocurrió dentro de alguna ventana emergente
      const popups = document.querySelector(".popup-container");

      const searchRef = document.querySelector(".search-section");
      
      popups.contains(event.target);
      searchRef.contains(event.target);
      if (
        navRef.current &&
        !navRef.current.contains(event.target) && !popups && !searchRef
      ) {
        setIsAccountOpen(false);
        setActiveTab(null); //restablece el estado cuando se haga click fuera de su container
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [isAccountOpen, isSearchOpen]);

  return (
    <>
      <nav ref={navRef} className="hero-nav">
        <ul className="hero-ul">
          <div ref={lineRef} className="hero-line__identificator"></div>

          {/* mapeo de los items de la barra de navegacion */}
          {[
            { label: "Mi cuenta", icon: "user" },
            { label: "Buscar", icon: "search" },
            { label: "Categorías", icon: "menu" },
            { label: "Mi carrito", icon: "cart" },
          ].map((item) => (
            <li
              key={item.label}
              className={`hero-list ${
                activeTab === item.label ? "active" : ""
              }`}
              
              onClick={(e) => {
                
                e.stopPropagation(); //evita que el evento se cierre inmediatamente
                handleTabClick(item.label);
                
              }}
            >
              <a href="#" className="hero-link">
                <box-icon
                  name={item.icon}
                  className={"hero-icon"}
                  color={`${
                    activeTab === item.label ? "currentColor" : "black"
                  }`}
                ></box-icon>

                <span className="hero-span">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay: si el popup está abierto, mostramos el overlay */}
      <Overlay
        isActive={isAccountOpen}
        onClick={() => {
          setIsAccountOpen(false);
          setActiveTab(null);
        }}
      />
      {/* Mostrar la ventana emergente de mi cuenta si isAccountOpen está en true */}
      {activeTab === "Mi cuenta" && (
        <AccountEmergente
          popupClose={() => {
            setIsAccountOpen(false);
            setActiveTab(null);
          }}
          isVisible={isAccountOpen}
        />
      )}

      {activeTab === "Buscar" && (
        <SearchSection closeSearch={() => {
          setIsSearchOpen(false);
          setActiveTab(null);
        }}/>
      )}
    </>
  );
};

export default Navbar;
