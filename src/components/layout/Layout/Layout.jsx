"use client";
import React, {useState, useRef} from "react";
import HeaderMain from "../../common/Header/Header";
import Navbar from "../../common/Navbar/Navbar";
import PopupAccount from "@/components/auth/PopupAccount/PopupAccount";
import PopupCategories from "../../common/PopupCategories/PopupCategories";
import SearchSection from "@/components/common/SearchSection/SearchSection";
import productsSearch from "@/constants/productsSearch";


const Layout = () => {
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

    // Manejo de la busqueda de los productos
    const handleSearch = (searchTerm) => {
      if (searchTerm.trim() === "") {
        setFilteredResults([]);
        return;
      }

      const productResults = productsSearch.filter((product) => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredResults(productResults); // Actualiza los resultados filtrados
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
      />

    </>
  );
}

export default Layout;