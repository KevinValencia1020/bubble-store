"use client";
import { useRef, useEffect, useState } from "react";
import { getCartCount } from '@/utils/cart';
import Link from 'next/link';
import Overlay from "../Overlay/Overlay";

const Navbar = ({ activeTab, onTabclick }) => {
  const lineRef = useRef(null); //referenciar la linea
  const navRef = useRef(null); //referenciar el contendor de nav

  const [userName, setUserName] = useState("Mi cuenta");
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

  const [cartCount, setCartCount] = useState(0);
  // Actualiza el contador del carrito
  useEffect(() => {
    function updateCart() { setCartCount(getCartCount()); }
    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

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
            { label: "Mi carrito", icon: "cart", key: "Mi carrito", cart: true },
          ].map((item) => (
            <li
              key={item.key}
              className={`hero-list relative flex items-center justify-center flex-col w-1/4 transition-colors duration-300 ${
                activeTab === item.key ? `active text-color-primario` : ""
              }`}
              onClick={(e) => {
                e.stopPropagation(); //evita que el evento se cierre inmediatamente
                if (item.cart) {
                  window.location.href = '/cart';
                } else {
                  onTabclick(item.key);
                }
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
                {item.cart && cartCount > 0 && (
                  <span className="absolute top-1 right-5 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
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
