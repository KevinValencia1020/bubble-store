import { productsData } from "@/constants/productsData";

// Simula un delay para emular una api real
const simuteDelay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Obterner todos los productos
export async function getAllProducts() {

  await simuteDelay(); // Simula un retraso de 300ms
  return [...productsData]; // Devuelve los datos de los productos

}

// Obtener producto por categoria
export async function getProductsByCategory(category) {

  await simuteDelay();
  
  if(!category || category === "all") {

    return [...productsData]; // Si no hay categoria o es "all", devuelve todos los productos
  }

  return productsData.filter((product) => 
    product.category.toLowerCase() === category.toLowerCase() // Filtra los productos por la categoria especificada
  );

}

// Obtener producto por su id
export async function getProductById(id) {
  await simuteDelay();

  const numericId = parseInt(id, 10); // Convierte el id a un número entero
  return productsData.find(product => product.id === numericId); // Devuelve el producto que coincide con el id o null si no se encuentra
}

// Obtener productos por termino de busqueda
export async function searchProducts(searchTerm) {

  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un retraso de 300ms
  if (!searchTerm?.trim()) {
    return []; // Si no hay término de búsqueda, devuelve un array vacío
  }

  // Filtra los productos por el termino de busqueda
  const result = productsData.filter((product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase())

  );

  // console.log(result);
  return result; // Devuelve los productos que coinciden con el término de búsqueda
}

// Obtener todas las categorias disponibles
export async function getAllCategories() {

  await simuteDelay();

  const categories = [...new Set(productsData.map(product => category))];
  return categories; // Devuelve un array con todas las categorias disponibles
}

// Simulacion de agregar productos al carrito
export async function addToCart(productId, quantity = 1) {
  await simuteDelay();

  const product = productsData.find(p => p.id === productId); // Busca el producto por su id

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  if (product.stock < quantity) {
    throw new Error("No hay suficiente stock");
  }

  return {
    success: true,
    message: `${quantity} unidades de ${product.name} han sido agregadas al carrito.`,
    product,
    quantity,
  }
}
