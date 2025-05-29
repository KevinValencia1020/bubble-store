import { useState, useEffect, useRef } from "react";
import ProductFilters from "./ProductFilters";
import CloseIcon from '@mui/icons-material/Close';

export default function ProductFiltersDrawer({
  open,
  onClose,
  brands,
  onFilterChange,
  initialFilters
}) {

  const ProductFiltersDrawerRef = useRef(null);

  const [isActive, setIsActive] = useState(open);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {

    if (open) {

      setIsActive(true); // Muestra el componente en el DOM

      setTimeout(() => setShowFilters(true), 50);
      document.body.style.overflow = "hidden";
    } else {

      setShowFilters(false);

      setTimeout(() => setIsActive(false), 300)// Desmonta el componente después de 300ms

      document.body.style.overflow = ""; // Activa el scroll del body
    }
  }, [open])
  if (!isActive) return null;

  // Overlay interno controlado por showFilters
  const handleOverlayClick = (e) => {
    // Solo cierra si el click es directamente sobre el overlay, no sobre el drawer
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay interno, controlado por showFilters */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}
      <div className="fixed inset-0 z-50 flex items-start justify-end pointer-events-none">
        <div
          ref={ProductFiltersDrawerRef}
          className={`bg-white rounded-l-xl shadow-lg p-6 w-[80%] max-w-xs h-screen relative overflow-y-auto transition-all duration-300 pointer-events-auto ${showFilters ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            onClick={onClose}
            aria-label="Cerrar filtros"
          >
            <CloseIcon />
          </button>
          <h2 className="text-lg font-semibold mb-4">Filtrar por</h2>
          <ProductFilters
            brands={brands}
            onFilterChange={onFilterChange}
            initialFilters={initialFilters} 
            onClose={onClose}
            />
        </div>
      </div>
    </>
  );
}
