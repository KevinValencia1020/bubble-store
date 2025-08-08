"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { registerUser } from "@/utils/api";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    console.log({ email, name, lastname, password, address, confirmPassword }); // Log para depuración
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser({ email, name, lastname, password, address, confirmPassword });
      if (data.message === "Usuario registrado correctamente") {
        setSuccess(true);
      } else {
        setError(data.message || "Error al registrar usuario");
      }
    } catch {
      setError("No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container w-[90%] mx-auto mt-10 py-4 bg-white rounded-xl shadow">
      
      {success ? (
        <div className="text-center mb-4 flex flex-col">
          <CheckCircleIcon
            fontSize="large"
            className="inline-block my-2 mx-auto"
            sx={{ color: "green" }}
          />
          ¡Registro exitoso! Ahora puedes iniciar sesión.
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">¡Registrate!</h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-5 w-[90%] mx-auto flex-wrap">

          <div className="relative w-full">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="relative w-full">
            <input
              type="email"
              id="registerEmail"
              className="border p-2 rounded w-full"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full">
            <input
              type="password"
              id="registerPassword"
              className="border p-2 rounded w-full"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative w-full">
            <input
              type="Password"
              id="confirmPassword"
              className="border p-2 rounded w-full"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          
          <button
            type="submit"
            className="bg-color-primario text-white p-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          {error && <span className="text-red-500 text-sm text-center">{error}</span>}
        </form>
        </>
        
      )}
    </div>
  );
};

export default RegisterPage;
