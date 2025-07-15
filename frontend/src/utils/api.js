const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function searchProducts(params) {
  // Construye la cadena de query con los parámetros proporcionados
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/products/search?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Error al buscar productos');
  }
  return response.json();


}