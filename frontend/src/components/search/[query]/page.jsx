"use client";

import { useEffect, useState } from "react";
import { searchProducts, getProductsByCategory } from "@/utils/api";
import ProductGrid from "../ProductGrid";

export default function SearchResultsPage({ params }) {
  const { query } = params; // Obtiene la consulta de búsqueda de los parámetros de la URL
  const [products, setProducts] = useState([]); // Estado para almacenar los productos encontrados
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const categoryResults = await getProductsByCategory(query); // Obtiene los productos por categoría
        
        if (categoryResults.length > 0) {
          setProducts(categoryResults); // Si hay resultados, los establece en el estado

        } else {

          const searchResults = await searchProducts(query); // Si no hay resultados por categoría, busca por término
          setProducts(searchResults); // Establece los resultados de búsqueda en el estado
        }
        
      } catch (error) {
        console.error("Error fetching search results:", error);

      } finally {

        setLoading(false); // Cambia el estado de carga a falso al finalizar
      }
    };

    fetchData(); // Llama a la función para obtener los datos
  }, [query]); // Se ejecuta cada vez que cambia la consulta

  if (loading) return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos

  return (
    <>
      <ProductGrid products={products} /> {/* Renderiza la cuadrícula de productos */}
    </>
  );
}