import ProductCard from "./ProductCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import { IconButton } from "@mui/material";
import ProductFiltersDrawer from "./ProductFiltersDrawer";
import { searchProducts } from "@/utils/api";
import { Skeleton } from "@mui/material";

// Componente que renderiza una cuadrícula de productos
// Recibe una lista de productos como prop y los muestra en una cuadrícula
export default function ProductGrid({ initialCategory = "" }) {
  const [filters, setFilters] = useState({
    category: initialCategory,
    brand: "",
    minPrice: "",
    maxPrice: "",
    sort: "default",
  });

  // Estado para mostrar/ocultar filtros
  const [showFilters, setShowFilters] = useState(false);

  // Estado para productos, marcas y categorías
  const [productList, setProductList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mapear el filtro de sort a los parámetros del backend
  function getSortParams(sort) {
    switch (sort) {
      case "price-asc":
        return { sortBy: "price", sortOrder: "ASC" };
      case "price-desc":
        return { sortBy: "price", sortOrder: "DESC" };
      case "name-asc":
        return { sortBy: "product_name", sortOrder: "ASC" };
      case "name-desc":
        return { sortBy: "product_name", sortOrder: "DESC" };
      case "brand-asc":
        return { sortBy: "brand", sortOrder: "ASC" };
      case "brand-desc":
        return { sortBy: "brand", sortOrder: "DESC" };
      default:
        return { sortBy: undefined, sortOrder: undefined };
    }
  }

  // Fetch productos del backend cuando cambian los filtros
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (filters.category) params.category = filters.category;

        if (filters.brand) params.brand = filters.brand;

        if (filters.minPrice) params.minPrice = filters.minPrice;

        if (filters.maxPrice) params.maxPrice = filters.maxPrice;

        const { sortBy, sortOrder } = getSortParams(filters.sort);

        if (sortBy) params.sortBy = sortBy;
        if (sortOrder) params.sortOrder = sortOrder;

        // Puedes agregar más parámetros aquí si es necesario
        const data = await searchProducts(params);
        setProductList(data.products || []);

        // Extraer marcas únicas de los productos recibidos
        setBrands(Array.from(new Set((data.products || []).filter(p => !!p.brand).map(p => p.brand))));

        // Guardar categorías para el selector
        setCategories(data.categories || []);

      } catch (err) {
        setError(err.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [filters]);

  // Handler para cambiar la categoría
  const handleCategoryChange = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  return (
    <>
      <div className="product-grid w-[90%] mx-auto my-5 overflow-hidden">
        {/* Selector de categoria */}
        <div className="flex items-center mb-4 gap-4">
          <select
            className="border rounded px-3 py-2"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
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
        
        {loading ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 w-full">

        {Array.from({ length: 8}).map((_, index) => (

          <div key={index} className="p-2">

            <Skeleton variant="rectangular" width="100%" height={160} className="rounded-xl" animation="wave"/>

            <Skeleton variant="text" width="80%" height={30} animation="wave"/>

            <Skeleton variant="text" width="60%" height={30} animation="wave"/>
          </div>
        ))}
      </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {productList.length === 0 ? (
              <li className="col-span-full text-center text-gray-500">No hay productos que coincidan con los filtros.</li>
            ) : (
              productList.map((product) => (
                <li key={product.product_id}>
                  <Link href={`/product/${encodeURIComponent(product.product_id)}`}>
                    <ProductCard
                      id={product.product_id}
                      name={product.product_name}
                      price={product.price}
                      image={product.thumbnail}
                      brand={product.brand}
                      onAddToCart={product.onAddToCart}
                    />
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
}