"use client";

import { useEffect, useState } from "react";
import { searchProducts } from "@/utils/api";
import ProductGrid from "../../../components/search/ProductGrid";
import { useParams, useSearchParams } from "next/navigation";
import { Skeleton } from "@mui/material";

export default function SearchResultsPage() {

  const params = useParams(); // Obtiene los parámetros de la URL
  const searchParams = useSearchParams();
  const query = params.query; // Extrae la consulta de búsqueda de los parámetros
  const [products, setProducts] = useState([]); // Estado para almacenar los productos encontrados
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => {
    setLoading(true); // Cambia el estado de carga a verdadero al iniciar la búsqueda
    setProducts([]); // Limpia los productos antes de la búsqueda

    const fetchData = async () => {
      try {
        const type = searchParams.get("type");
        let data;
        if (type === "category") {
          data = await searchProducts({ category: query });
        } else {
          data = await searchProducts({ q: query });
        }
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false); // Cambia el estado de carga a falso al finalizar
      }
    };

    fetchData(); // Llama a la función para obtener los datos
  }, [query, searchParams]); // Se ejecuta cada vez que cambia la consulta o el tipo

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
      
      <ProductGrid key={query} products={products} initialCategory={searchParams.get('type') === 'category' ? query : ''}/> {/* Renderiza la cuadrícula de productos */}
    </>
  );
}