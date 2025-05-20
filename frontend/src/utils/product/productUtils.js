export function filterProducts(products, filters) {

  return products.filter((product) => {

    // Filtra por categoría
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Filtra por marca
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }

    // Filtra por nombre
    if (filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    // Filtra por precio mínimo
    if (filters.minPrice && product.price < parseFloat(filters.minPrice)) {
      return false;
    }

    // Filtra por precio máximo
    if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) {
      return false;
    }

    return true; // Si pasa todos los filtros, lo incluye en el resultado
  }).sort((a, b) => {

    // Ordenar segun el criterio de ordenamiento
    switch (filters.sort) {

      case "price-asc":
        return a.price - b.price; // Ordenar por precio ascendente
      case "price-desc":
        return b.price - a.price; // Ordenar por precio descendente
      case "name-asc":
        return a.name.localeCompare(b.name); // Ordenar por nombre ascendente
      case "name-desc":
        return b.name.localeCompare(a.name); // Ordenar por nombre descendente
      default:
        return 0; // Sin ordenamiento
    }
  })
}