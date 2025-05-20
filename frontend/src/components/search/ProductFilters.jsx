import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export default function ProductFilters({
  categories,
  onFilterChange,
  initialFilters = {},
}) {
  const [filters, setFilters] = useState({
    category: initialFilters.category || "",
    brand: initialFilters.brand || "",
    minPrice: initialFilters.minPrice || "",
    maxPrice: initialFilters.maxPrice || "",
    sort: initialFilters.sort || "default",
  });

  // Actualiza los filtros y notifica al componente padre
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }; // Crea un nuevo objeto de filtros con el valor actualizado

    setFilters(newFilters); // Actualiza el estado local de los filtros

    onFilterChange(newFilters); // Notifica al componente padre sobre los cambios en los filtros
  };

  useEffect(() => {
    // Si cambian los filtros iniciales (por ejemplo, por cambios en la URL)
    setFilters({
      category: initialFilters.category || filters.category,
      brand: initialFilters.brand || filters.brand,
      minPrice: initialFilters.minPrice || filters.minPrice,
      maxPrice: initialFilters.maxPrice || filters.maxPrice,
      sort: initialFilters.sort || filters.sort,
    });
  }, [initialFilters]); // Actualiza los filtros cuando cambian los valores iniciales

  return (
    <>
      <div className="product-filters">

        <div className="product-filters__group">

          <label htmlFor="category">Categoría</label>

          // Renderiza un select con las categorías disponibles
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >

            <option value="">Todas las categorías</option>

            {categories.map((category) => (

              <option key={category} value={category}>
                {category}
              </option>

            ))}

          </select>

        </div>

        <div className="product-filters__group">

          <label htmlFor="brand">Marca</label>

          // Renderiza un select con las marcas disponibles
          <select
            id="brand"
            value={filters.brand}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
          >

            <option value="">Todas las marcas</option>

            {categories.map((category) => (

              <option key={category} value={category}>
                {category}
              </option>

            ))}

          </select>
        </div>

        <div className="product-filters__group">
          <label htmlFor="sort">Ordenar por</label>

          // Renderiza un select con las opciones de ordenamiento
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
          >
            <option value="default">Predeterminado</option>
            <option value="price-asc">Precio: Bajo a Alto</option>
            <option value="price-desc">Precio: Alto a Bajo</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
            <option value="brand-asc">Marca: A-Z</option>
            <option value="brand-desc">Marca: Z-A</option>
          </select>
        </div>

        <IconButton
          type="button"
          onClick={() => {
            const resetFilters = {
              category: "",
              brand: "",
              minPrice: "",
              maxPrice: "",
              sort: "default",
            };
            setFilters(resetFilters); // Resetea los filtros locales
            onFilterChange(resetFilters); // Notifica al componente padre sobre los cambios en los filtros
          }}
        >
          Limpiar filtros
          <FilterAltOffIcon/>
        </IconButton>
      </div>
    </>
  );
}
