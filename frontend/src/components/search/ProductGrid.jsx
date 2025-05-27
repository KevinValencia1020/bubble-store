import ProductCard from "./ProductCard";
import Link from "next/link";
import { useState, useMemo } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import { IconButton } from "@mui/material";
import ProductFiltersDrawer from "./ProductFiltersDrawer";

// Componente que renderiza una cuadrícula de productos
// Recibe una lista de productos como prop y los muestra en una cuadrícula
export default function ProductGrid({ products }) {
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    sort: "default",
  });

  // Estado para mostrar/ocultar filtros
  const [showFilters, setShowFilters] = useState(false);

  // Solo mostrar marcas que tengan productos
  const brands = Array.from(new Set(products.filter(p => !!p.brand).map(p => p.brand))); // Obtiene las marcas únicas de los productos

  // Lógica de filtrado y ordenamiento
  const filteredProducts = useMemo(() => {

    let filtered = [...products];
    
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => Number(p.price) >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => Number(p.price) <= Number(filters.maxPrice));
    }
    
    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "brand-asc":
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "brand-desc":
        filtered.sort((a, b) => b.brand.localeCompare(a.brand));
        break;
      default:
        break;
    }
    return filtered;
  }, [products, filters]);

  return (
    <>
      <div className="product-grid w-[90%] mx-auto my-5 overflow-hidden">
        {/* Botón para mostrar/ocultar filtros */}
        <div className="flex items-center mb-4">
          <IconButton
            onClick={() => setShowFilters((v) => !v)}
            className="md:hidden border border-color-primario"
            aria-label="Mostrar filtros"
            sx={{
              fontSize: "14px"
            }}
          >
            <TuneIcon />
          <span className="ml-2 font-semibold md:hidden">Filtros</span>
          </IconButton>
        </div>
        
        <ProductFiltersDrawer
          open={showFilters}
          onClose={() => setShowFilters(false)}
          brands={brands}
          onFilterChange={setFilters}
          initialFilters={filters}
        />
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {filteredProducts.length === 0 ? (
            <li className="col-span-full text-center text-gray-500">No hay productos que coincidan con los filtros.</li>
          ) : (
            filteredProducts.map((product) => (
              <li key={product.id}>
                <Link href={`/product/${encodeURIComponent(product.id)}`}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    brand={product.brand}
                    onAddToCart={product.onAddToCart}
                  />
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}