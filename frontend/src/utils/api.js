const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Funcion para buscar productos con todos los filtros
export async function searchProducts(params) {
  // Construye la cadena de query con los parámetros proporcionados
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/products/search?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Error al buscar productos');
  }
  return response.json();

}

// Funcion para obtener sugerencias para un término específico
export async function getProductsByCategory(term) {

  if (!term?.trim()) {
    return []; // Si no hay término, no hacemos la petición
  }

  const response = await fetch(`${API_BASE_URL}/products/search/suggestions?term=${encodeURIComponent(term)}`);

  if (!response.ok) {
    console.error('Error al obtener sugerencias');
    return [];
  }

  return response.json();

}