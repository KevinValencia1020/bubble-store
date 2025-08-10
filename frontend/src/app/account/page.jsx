"use client";
import React from "react";
import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import EditLocationIcon from '@mui/icons-material/EditLocation';

export default function AccountPage() {
  // Estado para usuario logueado
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));
      } catch (e) {}
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("userLogout"));
      window.location.href = "/";
    }
  };

  return (
    <div className="account-page bg-white min-h-screen">
      <div className="account-header bg-slate-800 text-white p-6 rounded-b-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">👤</span>
          <h1 className="text-2xl font-bold">Mi cuenta</h1>
        </div>
        <h2 className="text-xl font-semibold mb-1">¡Hola {user?.name || "Usuario"}!</h2>
        <p>Aquí podrás consultar todos tus movimientos</p>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
      <div className="account-options grid grid-cols-2 gap-4 p-6">
        <Link href="/account/profile" className="account-card bg-white shadow rounded-lg p-4 flex flex-col items-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">
            <PersonIcon fontSize="large"/>
          </span>
          <h3 className="font-bold text-color-primario mb-1">Mi Perfil</h3>
          <p className="text-gray-600 text-center text-sm">Revisa y edita tus datos personales.</p>
        </Link>
        <Link href="/account/addresses" className="account-card bg-white shadow rounded-lg p-4 flex flex-col items-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">
            <EditLocationIcon fontSize="large"/>
          </span>
          <h3 className="font-bold text-color-primario mb-1">Direcciones de envío</h3>
          <p className="text-gray-600 text-center text-sm">Agrega, edita y/o elimina una dirección</p>
        </Link>
        <Link href="/account/orders" className="account-card bg-white shadow rounded-lg p-4 flex flex-col items-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">📦</span>
          <h3 className="font-bold text-color-primario mb-1">Mis Pedidos</h3>
          <p className="text-gray-600 text-center text-sm">Gestiona tus pedidos, devoluciones y facturas</p>
        </Link>
        <Link href="/account/payments" className="account-card bg-white shadow rounded-lg p-4 flex flex-col items-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">💳</span>
          <h3 className="font-bold text-color-primario mb-1">Métodos de Pago</h3>
          <p className="text-gray-600 text-center text-sm">Agrega y valida tus métodos de pago</p>
        </Link>
        <Link href="/account/favorites" className="account-card bg-white shadow rounded-lg p-4 flex flex-col items-center hover:bg-blue-50 transition">
          <span className="text-3xl mb-2">❤️</span>
          <h3 className="font-bold text-color-primario mb-1">Lista de Favoritos</h3>
          <p className="text-gray-600 text-center text-sm">Tus productos favoritos</p>
        </Link>
      </div>
    </div>
  );
}
