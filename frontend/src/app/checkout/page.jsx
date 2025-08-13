"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCart, getCartCount } from '@/utils/cart';
import { formatCurrency } from '@/utils/money';
import { getProfile, getAddresses } from '@/utils/api';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Efecto para inicializar datos
  useEffect(() => {
    async function init() {
      const token = localStorage.getItem('token');
      // Verificar si el usuario está autenticado
      if (!token) {
        router.replace('/login?redirect=/checkout');
        return;
      }
      // Obtener perfil, direcciones y carrito
      try {
        const prof = await getProfile(token);
        setProfile(prof.user);
        const addrRes = await getAddresses(token).catch(() => ({ addresses: [] }));
        setAddresses(addrRes.addresses || []);
        setCart(getCart());
        if (addrRes.addresses?.length) {
          const def = addrRes.addresses.find(a => a.is_default) || addrRes.addresses[0];
          setSelectedAddress(def.address_id);
        }
      } catch (e) {
        setError(e.message || 'No se pudo cargar el checkout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.replace('/login?redirect=/checkout');
        return;
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  const subtotal = cart.reduce((acc, it) => acc + (typeof it.price === 'number' ? it.price : 0) * (it.quantity || 1), 0);

  if (loading) return <div className="py-48 flex justify-center items-center">
    <CircularProgress variant='soft' />
  </div>;

  if (error) return <div className="max-w-4xl mx-auto p-6 text-red-600">{error}</div>;
  if (!cart.length) return <div className="max-w-4xl mx-auto p-6">Carrito vacío. 
    <Link className="text-color-primario underline" href="/">
      Ir a productos
    </Link>
  </div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h4 className="text-xl font-semibold">
        Verifica tu pedido y dirección de envío
      </h4>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 space-y-6">

          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">Resumen de productos ({getCartCount()})</h2>
            <ul className="divide-y divide-gray-200">

              {cart.map(item => (
                <li key={item.id} className="py-3 flex justify-between gap-4">
                  <div className="flex gap-3 min-w-0">

                    {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border" />}

                    <div className="min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
                    </div>

                  </div>
                  <div className="text-sm font-semibold whitespace-nowrap">{formatCurrency((item.price||0)*item.quantity)}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-3">
              Dirección de envío
            </h2>
            {addresses.length === 0 && (
              <p className="text-sm">No tienes direcciones guardadas. <Link href="/profile#addresses" className="text-color-primario underline">Agregar dirección</Link></p>
            )}
            {addresses.length > 0 && (
              <div className="space-y-3">
                {addresses.map(a => (
                  <label key={a.address_id} className="flex gap-3 items-start text-sm border p-3 rounded cursor-pointer hover:border-color-primario">
                    <input type="radio" name="address" value={a.address_id} checked={selectedAddress===a.address_id} onChange={()=>setSelectedAddress(a.address_id)} />

                    <div className="flex-1">

                      <p className="font-medium">{a.recipient_name} {a.is_default && <span className="ml-2 text-xs bg-color-primario text-white px-2 py-0.5 rounded">Predeterminado</span>}</p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {a.address_line1} {a.city} {a.state}
                      </p>
                      {a.phone && <p className="text-xs text-gray-500">Tel: {a.phone}</p>}
                    </div>
                    
                  </label>
                ))}
              </div>
            )}
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow space-y-2">
            <h2 className="font-semibold">Resumen</h2>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>
                Envío
              </span>
              <span className="text-green-500">
                Gratis
              </span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <button disabled={!selectedAddress} className="w-full mt-2 bg-color-primario text-white py-2 rounded disabled:opacity-50">Pagar</button>
            {!selectedAddress && <p className="text-xs text-red-600">Selecciona una dirección</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}
