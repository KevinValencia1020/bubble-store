const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Funcion para manejar la respuesta de la API
async function handleApiResponse(response) {

  if (!response.ok) {

    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
  
}

/**
 * Busca productos con diversos filtros.
 * @param {Object} params - Objeto con parametros de busqueda (ej: { q: 'Samsung s25', category: 'celular' }).
 * @returns {Promise<Array>} - Promesa que resuelve a una lista de productos.
 */

// Funcion para buscar productos con todos los filtros
export async function searchProducts(params) {
  // Construye la cadena de query con los parámetros proporcionados
  const queryParams = new URLSearchParams(params || {}).toString();

  const url = `${API_BASE_URL}/products/search?${queryParams}`;
  
  try {
    const response = await fetch(url);
    return await handleApiResponse(response);

  } catch (error) {
    
    console.error('Error en searchProducts:', error);
    throw error;
  }
}

/**
 * Obtiene sugerencias de busqueda para un termino especifico.
 * @param {string} term - Termino de busqueda para las sugerencias.
 * @returns {Promise<Array>} - Promesa que resuelve a una lista de sugerencias.
 */

// Obtener productos por categoría
export async function getProductsByCategory(category) {
  const url = `${API_BASE_URL}/products/search?category=${encodeURIComponent(category)}`;
  const response = await fetch(url);
  return await handleApiResponse(response);
}

// Funcion para obtener sugerencias para un término específico
export async function getProductSuggetions(term) {

  if (!term?.trim()) {
    return []; // Si no hay término, no hacemos la petición
  }

  const url = `${API_BASE_URL}/products/search/suggestions?term=${encodeURIComponent(term)}`;


  try {
    const response = await fetch(url);
    return await handleApiResponse(response);

  } catch (error) {

    console.error('Error en getProductSuggetions:', error);
    return []; // devuelve el array vacio si hay error en la sugerencias
    
  }

}