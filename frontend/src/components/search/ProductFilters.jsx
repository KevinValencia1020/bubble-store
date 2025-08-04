import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export default function ProductFilters({
  brands = [],
  onFilterChange,
  initialFilters = {},
  onClose
}) {
  const [filters, setFilters] = useState({
    category: initialFilters.category || '',
    brand: initialFilters.brand || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    sort: initialFilters.sort || 'default',
  });

  // Cuando cambian los filtros iniciales, actualiza los temporales
  useEffect(() => {
    setTempFilters({
      category: initialFilters.category || '',
      brand: initialFilters.brand || '',
      minPrice: initialFilters.minPrice || '',
      maxPrice: initialFilters.maxPrice || '',
      sort: initialFilters.sort || 'default',
    });
  }, [initialFilters]);

  // Estado local para los filtros temporales
  const [tempFilters, setTempFilters] = useState({
    category: initialFilters.category || '',
    brand: initialFilters.brand || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    sort: initialFilters.sort || 'default',
  });

  // Actualiza los filtros temporales
  const handleTempFilterChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Aplica los filtros al hacer click en el botón
  const handleApplyFilters = () => {
    setFilters(tempFilters);
    onFilterChange && onFilterChange(tempFilters);

    if (onClose) {
      onClose();
    }
  };

  const resetFilters = () => { 
    const reset = {
      brand: '',
      minPrice: '',
      maxPrice: '',
      sort: 'default',
    };
    setTempFilters((prev) => ({ ...prev, ...reset }));
    setFilters((prev) => ({ ...prev, ...reset }));
    onFilterChange && onFilterChange({ ...filters, ...reset });

    if (onClose) {
      onClose();
    }
  }

  return (
    <div className='product-filters flex flex-wrap gap-4 p-4 bg-white rounded-xl shadow overflow-hidden'>
      <div className='product-filters__group flex flex-col'>
        <label htmlFor='brand'>Marca</label>
        <div className='flex flex-col gap-2'>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              id='brand'
              value={''}
              onChange={() => handleTempFilterChange('brand', '')}
              checked={tempFilters.brand === ''}
            />
            Todas las marcas
          </label>

          {brands.map((brand) => (
            <label key={brand} className='flex items-center gap-2'>
              <input
                type='radio'
                name='brand'
                value={brand}
                checked={tempFilters.brand === brand}
                onChange={() => handleTempFilterChange('brand', brand)}
                className=''
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className='product-filters__group'>
        <label htmlFor='rangePrice'>Rango de precios</label>

        <div className='flex flex-row gap-3 my-4'>
          <input
            id='minPrice'
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            min='0'
            value={tempFilters.minPrice}
            onChange={(e) => {
              if (e.target.value.length <= 8 && /^\d*$/.test(e.target.value)) {
                handleTempFilterChange('minPrice', e.target.value);
              }
            }}
            placeholder='Mínimo'
            className='border border-black rounded-md outline-none w-20 p-1 focus:border-color-primario'
          />

          <span>-</span>

          <input
            id='maxPrice'
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            min='0'
            value={tempFilters.maxPrice}
            onChange={(e) => {
              if (e.target.value.length <= 8 && /^\d*$/.test(e.target.value)) {
                handleTempFilterChange('maxPrice', e.target.value);
              }
            }}
            placeholder='Máximo'
            className='w-20 border border-black rounded-md outline-none p-1 focus:border-color-primario'
          />
        </div>
      </div>

      <div className='product-filters__group flex flex-col'>
        <label htmlFor='sort'>Ordenar por</label>
        <div className='relative'>
          {[
            { label: 'Predeterminado', value: 'default' },
            { label: 'Precio: Bajo a Alto', value: 'price-asc' },
            { label: 'Precio: Alto a Bajo', value: 'price-desc' },
            { label: 'Nombre: A-Z', value: 'name-asc' },
            { label: 'Nombre: Z-A', value: 'name-desc' },
            { label: 'Marca: A-Z', value: 'brand-asc' },
            { label: 'Marca: Z-A', value: 'brand-desc' },
          ].map((option) => (
            <label key={option.value} className='flex items-center gap-2'>
              <input
                type='radio'
                name='sort'
                value={option.value}
                checked={tempFilters.sort === option.value}
                onChange={() => handleTempFilterChange('sort', option.value)}
                className=''
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className='flex items-end gap-1 mt-2'>
          <div className='border border-color-primario rounded-lg p-1'>

            <IconButton
              type='button'
              onClick={handleApplyFilters}
              sx={{ fontSize: '12px' }}
              className='flex items-center bg-color-primario text-white rounded-md '
            >
              Aplicar filtros
            </IconButton>
          </div>

          <div className='border border-color-primario rounded-lg p-1'>

            <IconButton
              type='button'
              onClick={resetFilters}
              sx={{ fontSize: '12px' }}
              className='text-xs flex items-center justify-center gap-1'
            >
              Limpiar filtros
              <FilterAltOffIcon color='primary' fontSize='small' />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
