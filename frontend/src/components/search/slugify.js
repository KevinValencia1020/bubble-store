// Convierte el nombre del producto en un slug amigable para la URL
export default function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '') // Elimina acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza espacios y símbolos por guiones
    .replace(/^-+|-+$/g, ''); // Elimina guiones al inicio y final
}
