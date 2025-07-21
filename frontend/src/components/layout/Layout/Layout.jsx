'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import HeaderMain from '../../common/Header/Header';
import Navbar from '../../common/Navbar/Navbar';
import PopupAccount from '@/components/auth/PopupAccount/PopupAccount';
import PopupCategories from '../../common/PopupCategories/PopupCategories';
import SearchSection from '@/components/common/SearchSection/SearchSection';
import Footer from '@/components/common/Footer/Footer';
import { searchProducts, getProductSuggetions } from '@/utils/api';
import { productsData } from '@/constants/productsData';

const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('');

  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  // Estado para los resultados de busqueda
  const [filteredResults, setFilteredResults] = useState([]);

  const [filteredCategories, setFilteredCategories] = useState([]);

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const inputRef = useRef(null);

  // Maneja la apertura/cierre de los tabs del nav dinamicamente
  const handleTabClick = useCallback(
    (label) => {
      const isSameTab = activeTab === label;

      // Mapeo los estados y cerramos/abrimos segun corresponda
      setActiveTab(isSameTab ? '' : label);
      setIsAccountOpen(label === 'Mi cuenta' && !isSameTab);
      setIsSearchOpen(label === 'Buscar' && !isSameTab);
      setCategoriesOpen(label === 'Categorías' && !isSameTab);
    },
    [activeTab]
  );

  const openSearch = useCallback(() => {
    // Si el tab activo es "Buscar", abre el input del header
    setActiveTab('Buscar');
    // Abre el input del header al hacer foco
    setIsSearchOpen(true);
    setIsAccountOpen(false);
    setCategoriesOpen(false);
  }, []);
  // Esta funcion sirve para cerrar tanto el input del header y demas componentes cada que se de cliek en cerrar(x) o se desmarque un elemento del nav
  const closeSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setActiveTab('');
    setIsAccountOpen(false);
    setIsSearchOpen(false);
    setCategoriesOpen(false);
    setFilteredResults([]);
    setFilteredCategories([]);
    setIsLoadingSearch(false); // Limpia el estado de carga
    setSearchError(false); // Limpia el estado de error
  }, []);

  // Manejo de la busqueda de los productos

  const handleSearch = useCallback(async (searchTerm) => {
    const term = String(searchTerm || '').toLowerCase().trim();

    if (!term) {
      setFilteredResults([]);
      setFilteredCategories([]);
      setSearchError(null);
      return;
    }

    setIsLoadingSearch(true);
    setSearchError(null);

    try {

      const results = await searchProducts({ q: term });

      setFilteredResults(results.products || results); // Filtra los productos por término de búsqueda
      setFilteredCategories(results.categories || []); // Filtra las categorías por término de búsqueda

      if ((results.products && results.products.length > 0) || (results.categories && results.categories.length > 0) || (Array.isArray(results) && results.length > 0)) {

        setIsSearchOpen(true);

      } else {
        setIsSearchOpen(false);
      }
      
    } catch (error) {

      console.error('Error al bucar productos:', error);
      setFilteredResults([]);
      setFilteredCategories([]);
      setSearchError('Hubo un problema al buscar productos. Inténtelo de nuevo.');
      
    } finally {
      setIsLoadingSearch(false); // Finaliza el estado de carga
    }
  }, []);

  // Efecto para limpiar resultados al cerrar la busqueda
  useEffect(() => {
    if (!isSearchOpen) {
      setFilteredResults([]);
      setFilteredCategories([]);
      setSearchError(null);
      setIsLoadingSearch(false);
    }
  }, [isSearchOpen]);

  // Implementacion de sugerencias con Debounce
  const [searchTermForSuggetions, setSearchTermForSuggetions] = useState('');
  const [suggetions, setSuggetions] = useState([]);
  const [isLoadingSuggetions, setIsLoadingSuggetions] = useState(false);

  // useEffect maneja el debounce para las sugerencias
  useEffect(() => {

    if (!searchTermForSuggetions || searchTermForSuggetions.length < 2) {
      setSuggetions([]);
      return;
    }

    const handler = setTimeout(async () => {
      setIsLoadingSuggetions(true);
      // Realiza la solicitud de sugerencias con el término de búsqueda
      try {

        const fetchedSuggetions = await getProductSuggetions(searchTermForSuggetions);
        setSuggetions(fetchedSuggetions);
        
      } catch (error) {
        console.error('Error al obtener sugerencias: ', error);
        setSuggetions([]);
        
      } finally {
        setIsLoadingSuggetions(false); // Finaliza el estado de carga
      }
    }, 300);

    return () => {
      clearTimeout(handler); // Limpia el timer si el termino cambia antes de que se ejecute
    };

  },[searchTermForSuggetions]);

  return (
    <>
      <Navbar activeTab={activeTab} onTabclick={handleTabClick} />

      <HeaderMain
        activeTab={activeTab}
        openSearch={openSearch}
        closeSearch={closeSearch}
        inputRef={inputRef}
        onSearch={handleSearch}
        onSearchTermChange={setSearchTermForSuggetions}
      />

      <PopupAccount popupClose={closeSearch} isVisible={isAccountOpen} />

      <PopupCategories
        isCategoriesActive={isCategoriesOpen}
        closeCategories={closeSearch}
      />

      <SearchSection
        isActive={isSearchOpen}
        filteredResults={filteredResults}
        filteredCategories={filteredCategories}
        closeSearch={closeSearch}
        suggetions={suggetions}
        isLoadingSuggetions={isLoadingSuggetions}
      />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
