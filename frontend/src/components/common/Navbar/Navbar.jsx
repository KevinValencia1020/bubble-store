"use client";
import React, { useRef, useEffect } from "react";
import Overlay from "../Overlay/Overlay";

const Navbar = ({ activeTab, onTabclick }) => {
  const lineRef = useRef(null); //referenciar la linea
  const navRef = useRef(null); //referenciar el contendor de nav

  const [userName, setUserName] = React.useState("Mi cuenta");
  useEffect(() => {
    function updateUserName() {
      if (typeof window !== "undefined") {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user && user.name) {
            setUserName(user.name);
          } else {
            setUserName("Mi cuenta");
          }
        } catch (e) {
          setUserName("Mi cuenta");
        }
      }
    }
    updateUserName();
    window.addEventListener("userLogin", updateUserName);
    return () => {
      window.removeEventListener("userLogin", updateUserName);
    };
  }, []);

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
      <nav ref={navRef} className="hero-nav fixed bottom-0 left-0 w-full bg-color-secundario h-1/6 shadow-menu-shadow z-50 flex overflow-hidden">

        <ul className={`hero-ul w-[99%] my-0 mx-auto relative flex flex-row items-center justify-evenly gap-x-1 text-center`}>

          <div ref={lineRef} className="hero-line__identificator absolute top-0 left-0 h-1 bg-color-primario transition-all duration-300 ease-in-out w-0 opacity-0"></div>

          {/* mapeo de los items de la barra de navegacion */}
          {[
            { label: userName, icon: "user", key: "Mi cuenta" },
            { label: "Buscar", icon: "search", key: "Buscar" },
            { label: "Categorías", icon: "menu", key: "Categorías" },
            { label: "Mi carrito", icon: "cart", key: "Mi carrito" },
          ].map((item) => (
            <li
              key={item.key}
              className={`hero-list relative flex items-center justify-center flex-col w-1/4 transition-colors duration-300 ${
                activeTab === item.key ? `active text-color-primario` : ""
              }`}
              onClick={(e) => {
                e.stopPropagation(); //evita que el evento se cierre inmediatamente
                onTabclick(item.key);
              }}
            >
              <span className="hero-link flex flex-col justify-center items-center gap-1">
                <box-icon
                  name={item.icon}
                  className={"hero-icon"}
                  color={`${
                    activeTab === item.key ? "currentColor" : "black"
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
        </>
    </>
  );
};

export default Navbar;
