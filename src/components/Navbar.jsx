import React, { useRef, useEffect } from "react";
import AccountEmergente from "./PopupAccount";
import Overlay from "./Overlay";
import "../styles/navbar.css";

const Navbar = ({ activeTab, onTabclick }) => {
  //const [activeTab, setActiveTab] = useState(""); // destructuracion para las propiedades del mapeo de hero-list
  const lineRef = useRef(null); //referenciar la linea
  const navRef = useRef(null); //referenciar el contendor de nav

  useEffect(() => {
    if (activeTab && lineRef.current) {
      setTimeout(() => {
        const activeLineElement = document.querySelector(".hero-list.active");

        if (activeLineElement) {
          const { offsetWidth, offsetLeft } = activeLineElement;

          lineRef.current.style.width = `${offsetWidth}px`;
          lineRef.current.style.transform = `translateX(${offsetLeft}px)`;
          lineRef.current.style.opacity = "1";
        }
      }, 50);
    } else {
      lineRef.current.style.opacity = "0";
      lineRef.current.style.width = "0";
    }
  }, [activeTab]);

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
                onTabclick(item.label);
              }}
            >
              <span href="#" className="hero-link">
                <box-icon
                  name={item.icon}
                  className={"hero-icon"}
                  color={`${
                    activeTab === item.label ? "currentColor" : "black"
                  }`}
                ></box-icon>

                <span className="hero-span">{item.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mostrar la ventana emergente de mi cuenta si isAccountOpen está en true */}
        <>
          {/* Overlay: si el popup está abierto, mostramos el overlay */}
          <Overlay
            isActive={activeTab === "Mi cuenta"}
            onClick={() => {
              onTabclick("");
            }}
          />
          <AccountEmergente
            popupClose={() => onTabclick("")}
            isVisible={activeTab === "Mi cuenta"}
          />
        </>
    </>
  );
};

export default Navbar;
