"use client";
import { useState, useEffect, useRef } from 'react';
import { getAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '@/utils/api';
import CircularProgress from '@mui/joy/CircularProgress';

const emptyForm = {
  recipient_name: '',
  phone: '',
  document_id: '',
  country_code: 'CO',
  state: '',
  city: '',
  neighborhood: '',
  postal_code: '',
  address_line1: '',
  address_line2: '',
  reference: '',
  latitude: '',
  longitude: '',
  is_default: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const tokenRef = useRef(null);
  const required = ['recipient_name','state','city','address_line1'];
  const isCreating = !editingId;
  const isMissing = (f) => isCreating && (!form[f] || !form[f].trim());

  // Iniciar carga de direcciones
  useEffect(() => {
    tokenRef.current = localStorage.getItem('token');
    load();
  }, []);

  // Funcion para cargar direcciones
  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAddresses(tokenRef.current);
      setAddresses(data.addresses || []);
    } catch (e) {
      setError(e.message || 'Error al cargar direcciones');
    } finally {
      setLoading(false);
    }
  }

  // Funcion para manejar cambios en el formulario
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  // Iniciar creacion de una nueva direccion
  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
  }

  // Iniciar edicion de una direccion existente
  function startEdit(addr) {
    setEditingId(addr.address_id);
    const normalize = (v) => (v === null || v === undefined ? '' : v);
    setForm({
      recipient_name: normalize(addr.recipient_name),
      phone: normalize(addr.phone),
      document_id: normalize(addr.document_id),
      country_code: normalize(addr.country_code) || 'CO',
      state: normalize(addr.state),
      city: normalize(addr.city),
      neighborhood: normalize(addr.neighborhood),
      postal_code: normalize(addr.postal_code),
      address_line1: normalize(addr.address_line1),
      address_line2: normalize(addr.address_line2),
      reference: normalize(addr.reference),
      latitude: normalize(addr.latitude),
      longitude: normalize(addr.longitude),
      is_default: !!addr.is_default,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      // Preparar payload convirtiendo strings vacíos a null para campos opcionales
      const optional = ['phone','document_id','neighborhood','postal_code','address_line2','reference','latitude','longitude'];
      const payload = { ...form };
      optional.forEach(k => { if (payload[k] === '') payload[k] = null; });

      if (editingId) {
        await updateAddress(tokenRef.current, editingId, payload);
      } else {
        await createAddress(tokenRef.current, payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();

    } catch (e) {
      setError(e.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar dirección?')) return;
    try {
      await deleteAddress(tokenRef.current, id);
      await load();
    } catch (e) {
      alert(e.message || 'Error al eliminar');
    }
  }

  async function handleSetDefault(id) {
    try {
      await setDefaultAddress(tokenRef.current, id);
      await load();
    } catch (e) {
      alert(e.message || 'Error al establecer predeterminada');
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Direcciones de Envío</h1>
      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {loading ? <div className='flex justify-center items-center'>
            <CircularProgress size='md'/>
          </div> : (
            addresses.length === 0 ? <div className="text-gray-500">Sin direcciones aún.</div> : (
              <ul className="space-y-3">
                {addresses.map(a => (
                  <li key={a.address_id} className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-white shadow-sm">
                    <div className="text-sm">
                      <div className="font-semibold">{a.recipient_name} {a.is_default && <span className="ml-2 text-xs bg-color-primario text-white px-2 py-0.5 rounded">Predeterminado</span>}</div>
                      <div>{a.address_line1}{a.address_line2 ? ', ' + a.address_line2 : ''}</div>
                      <div>{a.city}, {a.state} ({a.country_code})</div>
                      {a.phone && <div>📞 {a.phone}</div>}
                    </div>
                    <div className="flex gap-2 text-xs">

                      {!a.is_default && <button onClick={() => handleSetDefault(a.address_id)} className="px-3 py-1 bg-color-primario text-white rounded hover:bg-indigo-700">Predeterminado</button>}
                      <button onClick={() => startEdit(a)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Editar</button>
                      <button onClick={() => handleDelete(a.address_id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        <div className="bg-white shadow p-4 rounded">

          <h2 className="font-semibold mb-2 text-lg">{editingId ? 'Editar dirección' : 'Nueva dirección'}</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs text-gray-500">Campos marcados con <span className="text-red-600 font-semibold">*</span> son obligatorios.</p>

            <div>
              <input name="recipient_name" value={form.recipient_name} onChange={handleChange} placeholder="Nombre destinatario *" className={`w-full rounded px-3 py-2 border outline-color-primario ${isMissing('recipient_name') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} required />
              {isMissing('recipient_name') && <p className="text-xs text-red-600 mt-1">Requerido</p>}
            </div>

            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" className="w-full border border-gray-300 outline-color-primario rounded px-3 py-2" />

            <input name="document_id" value={form.document_id} onChange={handleChange} placeholder="Documento" className="w-full border border-gray-300 outline-color-primario rounded px-3 py-2" />

            <div>
              <input name="state" value={form.state} onChange={handleChange} placeholder="Departamento/Estado *" className={`w-full border rounded px-3 py-2 outline-color-primario ${isMissing('state') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} required />
              {isMissing('state') && <p className="text-xs text-red-600 mt-1">Requerido</p>}
            </div>

            <div>
              <input name="city" value={form.city} onChange={handleChange} placeholder="Ciudad *" className={`w-full border rounded px-3 py-2 outline-color-primario ${isMissing('city') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} required />
              {isMissing('city') && <p className="text-xs text-red-600 mt-1">Requerido</p>}
            </div>

            <input name="neighborhood" value={form.neighborhood} onChange={handleChange} placeholder="Barrio" className="w-full border border-gray-300 outline-color-primario rounded px-3 py-2" />

            <input name="postal_code" value={form.postal_code} onChange={handleChange} placeholder="Código postal" className="w-full border border-gray-300 outline-color-primario rounded px-3 py-2" />

            <div>
              <input name="address_line1" value={form.address_line1} onChange={handleChange} placeholder="Dirección (Línea 1) *" className={`w-full border rounded px-3 py-2 outline-color-primario ${isMissing('address_line1') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} required />
              {isMissing('address_line1') && <p className="text-xs text-red-600 mt-1">Requerido</p>}
            </div>

            <input name="address_line2" value={form.address_line2} onChange={handleChange} placeholder="Apto, Torre, Interior, Casa, Piso" className="w-full border border-gray-300 outline-color-primario rounded px-3 py-2" />

            <textarea name="reference" value={form.reference} onChange={handleChange} placeholder="Referencia" className="w-full border border-gray-300 outline-color-primario rounded px-3 py-2" rows={2} />

            <div className="flex gap-3 items-center text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" name="is_default" checked={form.is_default} onChange={handleChange} /> Predeterminada</label>
            </div>
            {(() => {
              const missingRequired = required.some(f => isMissing(f));
              const disabled = saving || (isCreating && missingRequired);

              return (
                <button
                  disabled={disabled}
                  className={`w-full py-2 rounded text-white disabled:opacity-40 disabled:cursor-not-allowed transition ${editingId ? 'bg-color-primario hover:bg-color-primario' : 'bg-color-primario hover:bg-color-primario'}`}
                  title={isCreating && missingRequired ? 'Completa los campos requeridos' : ''}
                >
                  {saving ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear')}
                </button>
              );
            })()}
            {editingId && <button type="button" onClick={startCreate} className="w-full bg-gray-300 py-2 rounded text-sm">Cancelar edición</button>}
          </form>
        </div>
      </div>
    </div>
  );
}
