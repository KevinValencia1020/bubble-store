"use client";
import { useState, useEffect, useRef } from 'react';
import { getProfile, updateProfile, changePassword } from '@/utils/api';
import CircularProgress from '@mui/joy/CircularProgress';

export default function ProfilePage() {

  // Estados para la carga y manejo de errores
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);
  const [error, setError] = useState(null);
  const [pwdError, setPwdError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [pwdSuccess, setPwdSuccess] = useState(null);
  const [form, setForm] = useState({ name: '', lastname: '', email: '' });

  // Estado para el formulario original
  const [originalForm, setOriginalForm] = useState({ name: '', lastname: '', email: '' });
  const [editing, setEditing] = useState({ name: false, lastname: false, email: false });
  const [fieldSaving, setFieldSaving] = useState({ name: false, lastname: false, email: false });
  const [fieldError, setFieldError] = useState({ name: null, lastname: null, email: null });
  const [fieldSuccess, setFieldSuccess] = useState({ name: null, lastname: null, email: null });
  const [pwdForm, setPwdForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const tokenRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      tokenRef.current = localStorage.getItem('token');
      loadProfile();
    }
  }, []);

  // Reintentar carga de perfil cuando ocurra un login después de haber estado en error
  useEffect(() => {

    function onUserLogin() {
      tokenRef.current = localStorage.getItem('token');
      if (tokenRef.current) {
        loadProfile();
      }
    }
    window.addEventListener('userLogin', onUserLogin);
    return () => window.removeEventListener('userLogin', onUserLogin);
  }, []);

  async function loadProfile() {
    setLoading(true);
    setError(null);
    try {
      if (!tokenRef.current) {
        setError('No autenticado');
        return;
      }
      const data = await getProfile(tokenRef.current);
      const loaded = { name: data.user.name || '', lastname: data.user.lastname || '', email: data.user.email || '' };

      setForm(loaded);
      setOriginalForm(loaded);
  
    } catch (e) {
      setError(e.message || 'Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function toggleEdit(field) {
    setEditing(ed => ({ ...ed, [field]: !ed[field] }));
  }

  function cancelField(field) {
    setForm(f => ({ ...f, [field]: originalForm[field] }));
    setEditing(ed => ({ ...ed, [field]: false }));
    setFieldError(fe => ({ ...fe, [field]: null }));
    setFieldSuccess(fs => ({ ...fs, [field]: null }));
  }

  async function saveField(field) {
    // Si no cambio el valor, solo cerrar edicion
    if (form[field] === originalForm[field]) {
      setEditing(ed => ({ ...ed, [field]: false }));
      return;
    }
    setFieldSaving(fs => ({ ...fs, [field]: true }));
    setFieldError(fe => ({ ...fe, [field]: null }));
    setFieldSuccess(fsu => ({ ...fsu, [field]: null }));

    try {
      const data = await updateProfile(tokenRef.current, form);

      // Actualizar original y localStorage
      const updated = { name: data.user.name, lastname: data.user.lastname, email: data.user.email };

      setOriginalForm(updated);

      localStorage.setItem('user', JSON.stringify({ ...(JSON.parse(localStorage.getItem('user')||'{}')), ...updated }));

      window.dispatchEvent(new Event('userLogin'));

      setEditing(ed => ({ ...ed, [field]: false }));

      setFieldSuccess(fs => ({ ...fs, [field]: 'Guardado' }));

      setTimeout(() => setFieldSuccess(fs => ({ ...fs, [field]: null })), 2000);

    } catch (e) {
      setFieldError(fe => ({ ...fe, [field]: e.message || 'Error' }));
    } finally {
      setFieldSaving(fs => ({ ...fs, [field]: false }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);
    try {
      const data = await updateProfile(tokenRef.current, form);
      setSuccess('Perfil actualizado');
      // Actualizar localStorage para reflejar nuevo nombre en navbar
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, name: data.user.name, lastname: data.user.lastname, email: data.user.email }));
      window.dispatchEvent(new Event('userLogin')); // reutilizamos para refrescar nombre
    } catch (e) {
      setError(e.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  function handlePwdChange(e) {
    const { name, value } = e.target;
    setPwdForm(f => ({ ...f, [name]: value }));
  }

  async function handlePwdSubmit(e) {
    e.preventDefault();
    setPwdSaving(true);
    setPwdError(null);
    setPwdSuccess(null);
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdError('Las contraseñas nuevas no coinciden');
      setPwdSaving(false);
      return;
    }
    try {
      await changePassword(tokenRef.current, pwdForm);
      setPwdSuccess('Contraseña actualizada');
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (e) {
      setPwdError(e.message || 'Error al cambiar contraseña');
    } finally {
      setPwdSaving(false);
    }
  }

  if (loading) return <div className="p-6 flex justify-center items-center">
    <CircularProgress size='lg'/>
  </div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-8 space-y-4">
        <h2 className="text-xl font-semibold">Datos personales</h2>
        <p className="text-sm text-gray-500">Pulsa el ícono 🖋️ para editar un campo.</p>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}

        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            {!editing.name ? (
              <div className="flex items-center justify-between border rounded px-3 py-2 bg-gray-50">
                <span>{form.name || <span className="text-gray-400">Sin definir</span>}</span>
                <button type="button" onClick={() => toggleEdit('name')} className="text-color-primario text-sm hover:underline">🖋️ Editar</button>
              </div>
            ) : (
              <div className="flex gap-2">

                <input name="name" value={form.name} onChange={handleChange} className="w-full border-none outline-color-primario rounded px-3 py-2" required autoFocus />

                <button type="button" onClick={() => saveField('name')} disabled={fieldSaving.name} className="px-3 py-2 bg-color-primario border-none text-white rounded text-sm disabled:opacity-50">{fieldSaving.name ? '...' : 'Listo'}
                  
                </button>
                <button type="button" onClick={() => cancelField('name')} className="px-3 py-2 bg-gray-300 rounded text-sm">Cancelar</button>
              </div>
            )}
            {fieldError.name && <p className="text-red-600 text-xs mt-1">{fieldError.name}</p>}
            {fieldSuccess.name && <p className="text-green-600 text-xs mt-1">{fieldSuccess.name}</p>}
          </div>
          {/* Apellido */}
            <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>

            {!editing.lastname ? (
              <div className="flex items-center justify-between border rounded px-3 py-2 bg-gray-50">
                <span>{form.lastname || <span className="text-gray-400">Sin definir</span>}</span>
                <button type="button" onClick={() => toggleEdit('lastname')} className="text-color-primario text-sm hover:underline">🖋️ Editar</button>
              </div>
            ) : (
              <div className="flex gap-2">

                <input name="lastname" value={form.lastname} onChange={handleChange} className="w-full border-none outline-color-primario rounded px-3 py-2" required autoFocus />

                <button type="button" onClick={() => saveField('lastname')} disabled={fieldSaving.lastname} className="px-3 py-2 bg-color-primario border-none text-white rounded text-sm disabled:opacity-50">{fieldSaving.lastname ? '...' : 'Listo'}</button>
                <button type="button" onClick={() => cancelField('lastname')} className="px-3 py-2 bg-gray-300 rounded text-sm">Cancelar</button>
              </div>
            )}
            {fieldError.lastname && <p className="text-red-600 text-xs mt-1">{fieldError.lastname}</p>}
            {fieldSuccess.lastname && <p className="text-green-600 text-xs mt-1">{fieldSuccess.lastname}</p>}
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            {!editing.email ? (
              <div className="flex items-center justify-between border rounded px-3 py-2 bg-gray-50">
                <span>{form.email || <span className="text-gray-400">Sin definir</span>}</span>
                <button type="button" onClick={() => toggleEdit('email')} className="text-color-primario text-sm hover:underline">🖋️ Editar</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border-none outline-color-primario rounded px-3 py-2" required autoFocus />
                <button type="button" onClick={() => saveField('email')} disabled={fieldSaving.email} className="px-3 py-2 bg-color-primario border-none text-white rounded text-sm disabled:opacity-50">{fieldSaving.email ? '...' : 'Listo'}</button>
                <button type="button" onClick={() => cancelField('email')} className="px-3 py-2 bg-gray-300 rounded text-sm">Cancelar</button>
              </div>
            )}
            {fieldError.email && <p className="text-red-600 text-xs mt-1">{fieldError.email}</p>}
            {fieldSuccess.email && <p className="text-green-600 text-xs mt-1">{fieldSuccess.email}</p>}
          </div>
        </div>
        { (editing.name || editing.lastname || editing.email) && (
          <div className="pt-2">
            {/* Botón global solo activo si hay cambios frente al original */}
            <button disabled={saving || (form.name===originalForm.name && form.lastname===originalForm.lastname && form.email===originalForm.email)} className="px-4 py-2 bg-color-primario text-white rounded hover:bg-color-primario disabled:opacity-50" onClick={handleSubmit}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        )}
      </form>

      <form onSubmit={handlePwdSubmit} className="bg-white shadow p-4 rounded space-y-4">
        <h2 className="text-xl font-semibold">Cambiar contraseña</h2>
        {pwdError && <div className="text-red-600 text-sm">{pwdError}</div>}
        {pwdSuccess && <div className="text-green-600 text-sm">{pwdSuccess}</div>}
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña actual</label>
            <input type="password" name="currentPassword" value={pwdForm.currentPassword} onChange={handlePwdChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
            <input type="password" name="newPassword" value={pwdForm.newPassword} onChange={handlePwdChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirmar nueva</label>
            <input type="password" name="confirmPassword" value={pwdForm.confirmPassword} onChange={handlePwdChange} className="w-full border rounded px-3 py-2" required />
          </div>
        </div>
        <button disabled={pwdSaving} className="px-4 py-2 bg-color-primario text-white rounded hover:bg-color-primario disabled:opacity-50">
          {pwdSaving ? 'Actualizando...' : 'Actualizar contraseña'}
        </button>
      </form>
    </div>
  );
}
