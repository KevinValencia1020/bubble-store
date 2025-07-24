"use client";

import { useEffect, useState } from "react";
import { searchProducts, getProductsByCategory } from "@/utils/api";
import ProductGrid from "../../../components/search/ProductGrid";
import { useParams } from "next/navigation";
import { Skeleton } from "@mui/material";

export default function SearchResultsPage() {

  const params = useParams(); // Obtiene los parámetros de la URL
  const query = params.query; // Extrae la consulta de búsqueda de los parámetros
  const [products, setProducts] = useState([]); // Estado para almacenar los productos encontrados
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => {
    
    setLoading(true); // Cambia el estado de carga a verdadero al iniciar la búsqueda
    setProducts([]); // Limpia los productos antes de la búsqueda

    const fetchData = async () => {

      try {
        const categoryResults = await getProductsByCategory({ category: query }); // Obtiene los productos por categoría
        
        if (Array.isArray(categoryResults.products) && categoryResults.products.length > 0) {
          setProducts(categoryResults.products); // Si hay resultados, los establece en el estado
        
        } else {
        
          const searchResults = await searchProducts({ q: query }); // Si no hay resultados por categoría, busca por término
          setProducts(Array.isArray(searchResults.products) ? searchResults.products : []); // Establece los resultados de búsqueda en el estado  
        }
        
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProducts([]); // Limpia los productos en caso de error
      } finally {

        setLoading(false); // Cambia el estado de carga a falso al finalizar
      }
    };

    fetchData(); // Llama a la función para obtener los datos
  }, [query]); // Se ejecuta cada vez que cambia la consulta

  if (loading) {

    return (

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 w-full">

        {Array.from({ length: 8}).map((_, index) => (

          <div key={index} className="p-2">

            <Skeleton variant="rectangular" width="100%" height={160} className="rounded-xl" animation="wave"/>

            <Skeleton variant="text" width="80%" height={30} animation="wave"/>

            <Skeleton variant="text" width="60%" height={30} animation="wave"/>
          </div>
        ))}
      </div>
    );
  } // Muestra un mensaje de carga mientras se obtienen los datos

  return (
    <>
      
      <ProductGrid key={query} products={products} /> {/* Renderiza la cuadrícula de productos */}
    </>
  );
}