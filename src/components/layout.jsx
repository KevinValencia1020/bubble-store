import React, {useState, useRef} from "react";
import HeaderMain from "./Header";
import Navbar from "./Navbar";
import AccountEmergente from "./AccountEmergente";
import PopupCategories from "./PopupCategories";


const Layout = () => {
  const [activeTab, setActiveTab] = useState("");

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

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
      setActiveTab("Buscar");
    }

    const closeSearch = () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
      setActiveTab("");
      setIsAccountOpen(false);
      setIsSearchOpen(false);
      setCategoriesOpen(false);
    }

  return (
    <>
      <Navbar activeTab={activeTab} onTabclick={handleTabClick}/>

      <HeaderMain
        activeTab={activeTab}
        openSearch={openSearch}
        closeSearch={closeSearch}
        inputRef={inputRef}
      />

      {activeTab === "Mi cuenta" && (
        <AccountEmergente 
          popupClose={closeSearch}
          isVisible={isAccountOpen}
        />
      )}

      {activeTab === "Categorías" && (
        <PopupCategories
          isCategoriesActive={isCategoriesOpen}
          closeCategories={closeSearch}
        />
      )}

    </>
  );
}

export default Layout;