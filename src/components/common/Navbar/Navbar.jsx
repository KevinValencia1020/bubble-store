import React, { useRef, useEffect } from "react";
import AccountEmergente from "../../auth/PopupAccount/PopupAccount";
import Overlay from "../Overlay/Overlay";

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
      <nav ref={navRef} className="hero-nav container fixed bottom-0 left-0 w-full bg-color-secundario h-1/6 shadow-menu-shadow z-50 flex overflow-hidden">

        <ul className={`hero-ul w-[99%] my-0 mx-auto relative flex flex-row items-center justify-evenly gap-x-1 text-center`}>

          <div ref={lineRef} className="hero-line__identificator absolute top-0 left-0 h-1 bg-color-primario transition-all duration-300 ease-in-out w-0 opacity-0"></div>

          {/* mapeo de los items de la barra de navegacion */}
          {[
            { label: "Mi cuenta", icon: "user" },
            { label: "Buscar", icon: "search" },
            { label: "Categorías", icon: "menu" },
            { label: "Mi carrito", icon: "cart" },
          ].map((item) => (
            <li
              key={item.label}
              className={`hero-list relative flex items-center justify-center flex-col w-1/4 transition-colors duration-300 ${
                activeTab === item.label ? `active text-color-primario` : ""
              }`}

              onClick={(e) => {
                e.stopPropagation(); //evita que el evento se cierre inmediatamente
                onTabclick(item.label);
              }}
            >
              <span className="hero-link flex flex-col justify-center items-center gap-1">

                <box-icon
                  name={item.icon}
                  className={"hero-icon"}
                  color={`${
                    activeTab === item.label ? "currentColor" : "black"
                  }`}
                ></box-icon>

                <span className="hero-span text-center text-xs">{item.label}</span>
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
