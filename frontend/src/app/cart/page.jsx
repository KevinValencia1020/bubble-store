"use client";
import { useEffect, useState } from 'react';
import { 
  getCart, 
  updateQuantity as cartUpdateQuantity, 
  removeFromCart, 
  clearCart, 
  getCartCount 
} from '@/utils/cart';
import Link from 'next/link';
import { formatCurrency } from '@/utils/money';

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  function refresh() {
    setItems(getCart());
  }

  // Efecto para sincronizar el carrito
  useEffect(() => {
    setMounted(true);
    refresh();
    const handler = () => refresh();
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
  }, []);

  // Calcular subtotal
  const subtotal = items.reduce((acc, it) => acc + (typeof it.price === 'number' ? it.price : 0) * (it.quantity || 1), 0);

  // Actualizar cantidad de un item
  function updateQuantity(id, delta) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1) return; // no permitir que se reduzca a menos de 1
    cartUpdateQuantity(id, newQty);
  }

  function remove(id) {
    removeFromCart(id);
  }

  function empty() {
    if (confirm('¿Vaciar carrito?')) clearCart();
  }

  if (!mounted) return null; // Evitar problemas de hidratacion

  return (

    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Mi carrito</h1>

      {items.length === 0 && (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="mb-4">Tu carrito está vacío.</p>
          <Link href="/" className="text-color-primario underline">Seguir comprando</Link>
        </div>
      )}
      {items.length > 0 && (
        <div className="space-y-4 overflow-hidden">
          <div className="flex justify-between items-center">

            <span className="text-sm text-gray-500">{getCartCount()} artículo(s)</span>
            <button onClick={empty} className="text-xs text-red-600 hover:underline">
              Vaciar carrito
            </button>
          </div>

          <ul className="divide-y divide-gray-200 bg-white rounded shadow">

            {items.map(item => (
              <li key={item.id} className="px-3 py-4 flex gap-3">

                {item.image && (
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded border" />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <Link href={`/product/${item.id}`} className="font-medium hover:text-color-primario line-clamp-1">{item.name}</Link>

                    <button onClick={() => remove(item.id)} className="text-xs text-red-500 hover:underline">Eliminar</button>

                  </div>
                  <div className="flex items-center gap-2 mt-2">

                    <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 border rounded flex items-center justify-center disabled:opacity-30" disabled={item.quantity <= 1}>-</button>
                    <span className="min-w-[2ch] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 border rounded flex items-center justify-center">+</button>
                  </div>

                </div>

                <div className="flex flex-col justify-between items-end gap-2 w-auto text-right shrink-0">
                  <div className="font-semibold text-sm sm:text-base whitespace-nowrap">{formatCurrency((typeof item.price === 'number' ? item.price : 0) * item.quantity)}</div>
                </div>
              </li>
            ))}

          </ul>

          <div className="bg-white p-4 rounded shadow flex flex-col gap-2">
            <div className="flex justify-between text-sm">

              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>

            </div>
            
            <button className="mt-2 bg-color-primario text-white py-2 rounded disabled:opacity-50" disabled={items.length === 0}>Proceder al pago</button>
          </div>
        </div>
      )}
    </div>
  );
}
