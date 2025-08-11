// Utilidades de carrito basado en localStorage
const CART_KEY = 'cart';

// Leer el carrito del localStorage
function readCart() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}

// Escribir el carrito en el localStorage
function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
}

// Exponer funciones para manipular el carrito
export function getCart() { return readCart(); }

// Contar artículos en el carrito
export function getCartCount() { return readCart().reduce((acc,i)=>acc + (i.quantity||0),0); }

// Añadir un producto al carrito
export function addToCart(product) {
  // acepta id o product_id desde el caller
  const pid = product.id || product.product_id;
  if (!pid) return;
  // precio (string -> number)
  const rawPrice = product.price;
  let priceNum = 0;

  if (typeof rawPrice === 'number') priceNum = rawPrice;

  else if (typeof rawPrice === 'string') {
    const cleaned = rawPrice.replace(/[^0-9,\.]/g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);
    if (!isNaN(parsed)) priceNum = parsed;
  }

  const cart = readCart();
  const idx = cart.findIndex(i => (i.id || i.product_id) === pid);
  // Si ya existe, actualizamos la cantidad
  if (idx >= 0) {
    cart[idx].quantity = (cart[idx].quantity || 0) + 1;
  } else {
    cart.push({ id: pid, product_id: pid, name: product.name, price: priceNum, image: product.image, quantity: 1 });
  }
  writeCart(cart);
}

// Actualizar cantidad de un item
export function updateQuantity(id, qty) {
  let cart = readCart();
  cart = cart.map(i => (i.id || i.product_id) === id ? { ...i, quantity: qty } : i).filter(i => (i.quantity || 0) > 0);
  writeCart(cart);
}

// Eliminar un item del carrito
export function removeFromCart(id) {
  const cart = readCart().filter(i => (i.id || i.product_id) !== id);
  writeCart(cart);
}

export function clearCart() { writeCart([]); }
