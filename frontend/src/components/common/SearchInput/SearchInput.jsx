"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import style from "./style.module.css";

export default function SearchInput({isActiveInput, inputRef, openInput, onSearch, closeSearch, onSearchTermChange
}) {
  // Constrolo el texto del input
  const [searchTerm, setSearchTerm] = useState("");

  // Si el tab activo es "Buscar", enfoca el input
  useEffect(() => {

    const timer = setTimeout(() => {
      
      if (isActiveInput === "Buscar" && inputRef.current) {
        inputRef.current.focus();
      }

    }, 200);

    return () => clearTimeout(timer);

  }, [isActiveInput]);

  // Cerrar la busqueda cuando el usuario cambia de tab
  useEffect(() => {
    if (isActiveInput !== "Buscar" && inputRef.current) {

      inputRef.current.blur();
      setSearchTerm(""); // Limpia el texto del input al cerrar la busqueda
    }
  }, [isActiveInput]);

  const handleFocus = () => {
    openInput(); // Abre el input al hacer foco
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); // Limpia los resultados al borrar el texto
    inputRef.current.focus();
  }

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearchTermChange) {
      onSearchTermChange(value);
    }

    if (onSearch) {
      onSearch(value); // Llama a la funcion onSearch con el valor del input
    }
  }

  const rouster = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    
    if (searchTerm.trim()) {
      
      rouster.push(`/search/${encodeURIComponent(searchTerm)}`); // Redirige a la pagina de resultados de busqueda
      closeSearch();
    }
  }

  return (
    <>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: "16px",
        }}
        className={clsx(
          style.heroForm,
          isActiveInput === "Buscar" && style.heroFormActive
        )}
      >
        <InputBase
          inputRef={inputRef}
          type="text"
          name="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          autoComplete="off"
          sx={{ ml: 1 }}
          inputProps={{ "aria-label": "buscar"}}
          className={style.heroInput}
        />

        <IconButton
          type="submit"
          aria-label="search"
          size="small"
          sx={{ color: "black" }}
        >
          <SearchIcon />
        </IconButton>

        {
          searchTerm && (

            <IconButton

              type="button"
              aria-label="delate"
              size="small"
              sx={{
                color: "black",
                position: "absolute",
                right: "20px",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClear();
              }}
            >

              <CloseIcon/>

            </IconButton>
          )
        }
      </Paper>
    </>
  );
}
