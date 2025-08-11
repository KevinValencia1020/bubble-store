// Funciones para formatear y parsear precios
export function parsePrice(raw) {
  if (raw == null) return 0;
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const digits = raw.replace(/[^0-9]/g, '');
    if (!digits) return 0;
    return parseInt(digits, 10); // sin decimales (COP)
  }
  return 0;
}

// Función para formatear precios
export function formatCurrency(value, currency = 'COP') {
  const n = typeof value === 'number' ? value : parsePrice(value);
  const noDecimals = ['COP','CLP','PYG','HUF','ISK','JPY','KRW'];
  const maximumFractionDigits = noDecimals.includes(currency) ? 0 : 2;
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency, maximumFractionDigits }).format(n);
}
