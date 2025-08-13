"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loginUser } from '@/utils/api';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const prefill = searchParams.get('email') || '';
  const comingFromCheckout = redirect === '/checkout';

  const [email, setEmail] = useState(prefill);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      // Ya logueado -> redirigir
      router.replace(redirect);
    }
  }, [redirect, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('userLogin'));
        router.replace(redirect);
      } else {
        setError(data?.message || 'Error desconocido');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[90%] mx-auto mt-10 py-6 bg-white rounded-xl shadow max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1>
      {comingFromCheckout && (
        <p className="text-xs text-center text-gray-600 mb-4">Inicia sesión para continuar con tu proceso de pago.</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border p-2 rounded outline-color-primario"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="border p-2 rounded outline-color-primario"
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button disabled={loading} className="bg-color-primario text-white py-2 rounded font-semibold disabled:opacity-60">
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
      <p className="text-center text-sm mt-4">¿No tienes cuenta? <a href={`/register?email=${encodeURIComponent(email)}`} className="text-color-primario underline">Regístrate</a></p>
    </div>
  );
}
