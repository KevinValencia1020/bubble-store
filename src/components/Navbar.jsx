import React, { useState, useRef, useEffect } from "react";
import AccountEmergente from "./AccountEmergente";
import "./css/Navbar.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(""); // destructuracion para las propiedades del mapeo de hero-list
  const lineRef = useRef(null); //referenciar la linea
  const navRef = useRef(null); //referenciar el contendor de nav
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        isAccountOpen
      ) {
        setIsAccountOpen(false);
        setActiveTab(null); //restablece el estado cuando se haga click fuera de su container
      }
    };

    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [isAccountOpen]);

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
                if (item.label === "Mi cuenta") {
                  setIsAccountOpen(!isAccountOpen);
                  setActiveTab(isAccountOpen ? null : item.label);
                } else {
                  setActiveTab(activeTab === item.label ? null : item.label);
                  setIsAccountOpen(false);
                }
                setActiveTab(activeTab === item.label ? null : item.label);
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
      {/* Mostrar popup si isAccountOpen está en true */}
      {isAccountOpen && (
        <AccountEmergente
          popupClose={() => {
            setIsAccountOpen(false);
            setActiveTab(null);
          }}
          isVisible={isAccountOpen}
        />
      )}
    </>
  );
};

export default Navbar;
