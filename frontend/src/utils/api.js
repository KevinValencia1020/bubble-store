const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

// Funcion para manejar la respuesta de la API
async function handleApiResponse(response) {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  if (!response.ok) {
    let errorData;
    
    if (isJson) {
      errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    } else {
      const text = await response.text().catch(() => '');

      errorData = { message: text?.startsWith('Cannot') ? 'Recurso no encontrado (ruta inexistente en backend)' : (text || 'Error desconocido') };
    }
    const err = new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
    err.status = response.status;
    err.payload = errorData;
    throw err;
  }
  if (isJson) return response.json();
  return response.text();
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

  const url = `${API_BASE_URL}/api/products/search?${queryParams}`;
  
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

  const url = `${API_BASE_URL}/api/products/search?category=${encodeURIComponent(category)}`;
  const response = await fetch(url);
  return await handleApiResponse(response);
}


// Funcion para obtener sugerencias para un término específico
export async function getProductSuggetions(term) {

  if (!term?.trim()) {
    return []; // Si no hay término, no hacemos la petición
  }

  const url = `${API_BASE_URL}/api/products/search/suggestions?term=${encodeURIComponent(term)}`;

  try {
    const response = await fetch(url);
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error en getProductSuggetions:', error);
    // Es mejor relanzar el error para que el llamador pueda manejarlo.
    throw error;
  }
}

export async function getProductById(idOrSlug) {
  // Extrae el id numérico si viene en formato 'id-slug'
  const id = idOrSlug?.toString().split("-")[0];
  const url = `${API_BASE_URL}/api/products/${id}`;
  const response = await fetch(url);
  return await handleApiResponse(response);
}

export async function registerUser({ email, name, lastname,  password, address, confirmPassword }) {
  
  const url = `${API_BASE_URL}/api/users/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, lastname, password, address, confirmPassword }),
  });
  return await handleApiResponse(response);
  
}

export async function loginUser({ email, password }) {
  const url = `${API_BASE_URL}/api/users/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return await handleApiResponse(response);
}

// Perfil
export async function getProfile(token) {
  const url = `${API_BASE_URL}/api/users/profile`;
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await handleApiResponse(response);
}

export async function updateProfile(token, { name, lastname, email }) {
  const url = `${API_BASE_URL}/api/users/profile`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ name, lastname, email })
  });
  return await handleApiResponse(response);
}

export async function changePassword(token, { currentPassword, newPassword, confirmPassword }) {
  const url = `${API_BASE_URL}/api/users/change-password`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
  });
  return await handleApiResponse(response);
}

// Direcciones
export async function getAddresses(token) {
  const url = `${API_BASE_URL}/api/users/addresses`;
  const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
  return await handleApiResponse(response);
}

// Crear una nueva direccion
export async function createAddress(token, payload) {
  const url = `${API_BASE_URL}/api/users/addresses`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  return await handleApiResponse(response);
}

// Actualizar una direccion existente
export async function updateAddress(token, id, payload) {
  const url = `${API_BASE_URL}/api/users/addresses/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  return await handleApiResponse(response);
}

// Eliminar una direccion existente
export async function deleteAddress(token, id) {
  const url = `${API_BASE_URL}/api/users/addresses/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await handleApiResponse(response);
}

// Establecer una direccion como predeterminada
export async function setDefaultAddress(token, id) {
  // Reutilizamos update pasando is_default true
  return updateAddress(token, id, { is_default: true });
}