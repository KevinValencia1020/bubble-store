"use client";
import React, {useState, useRef, useEffect} from "react";
import HeaderMain from "../../common/Header/Header";
import Navbar from "../../common/Navbar/Navbar";
import PopupAccount from "@/components/auth/PopupAccount/PopupAccount";
import PopupCategories from "../../common/PopupCategories/PopupCategories";
import SearchSection from "@/components/common/SearchSection/SearchSection";
import Footer from "@/components/common/Footer/Footer";
import { searchProducts } from "@/utils/api";


const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  // Estado para los resultados de busqueda
  const [filteredResults, setFilteredResults] = useState([]);

  const inputRef = useRef(null);

    // Maneja la apertura/cierre de los tabs del nav dinamicamente
    const handleTabClick = (label) => {
      const isSameTab = activeTab === label;

      // Mapeo los estados y cerramos/abrimos segun corresponda
      setActiveTab(isSameTab ? "" : label);
      setIsAccountOpen(label === "Mi cuenta" && !isSameTab);
      setIsSearchOpen(label === "Buscar" && !isSameTab);
      setCategoriesOpen(label === "Categorías" && !isSameTab);

    };

    const openSearch = () => {
      // Si el tab activo es "Buscar", abre el input del header
      setActiveTab("Buscar");
      // Abre el input del header al hacer foco
      setIsSearchOpen(true);
    }
    // Esta funcion sirve para cerrar tanto el input del header y demas componentes cada que se de cliek en cerrar(x) o se desmarque un elemento del nav
    const closeSearch = () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
      setActiveTab("");
      setIsAccountOpen(false);
      setIsSearchOpen(false);
      setCategoriesOpen(false);
      setFilteredResults([]);
    }

    useEffect(() => {

      if (!isSearchOpen) {

        setFilteredResults([]); // Limpia los resultados al cerrar la busqueda
      }
      
    }, [isSearchOpen]);

    // Manejo de la busqueda de los productos
    
    const handleSearch = async (searchTerm) => {

      try {

        const term = String(searchTerm || ""); // Convierte el término a minúsculas y elimina espacios en blanco

        if (term.trim() === "") {
          setFilteredResults([]);
         return;
        }

        // Llama a la función de búsqueda con el término ingresado
        const results = await searchProducts(term); 
        setFilteredResults(results); 
        setIsSearchOpen(true); // Abre la sección de búsqueda al obtener resultados

      } catch (error) {
        console.error("Error al buscar productos:", error);
        setFilteredResults([]); // En caso de error limpia los resultados
      }

    };

  return (
    <>
      <Navbar activeTab={activeTab} onTabclick={handleTabClick}/>

      <HeaderMain
        activeTab={activeTab}
        openSearch={openSearch}
        closeSearch={closeSearch}
        inputRef={inputRef}
        onSearch={handleSearch}
      />

      <PopupAccount 
        popupClose={closeSearch}
        isVisible={isAccountOpen}
      />

      <PopupCategories
        isCategoriesActive={isCategoriesOpen}
        closeCategories={closeSearch}
      />

      <SearchSection
        isActive={isSearchOpen}
        filteredResults={filteredResults}
        closeSearch={closeSearch}
      />

      {children}

      <Footer />

    </>
  );
}

export default Layout;