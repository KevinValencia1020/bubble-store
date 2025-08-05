import { Router } from "express";
import { searchProducts, getSuggestions, getProductById } from "../controllers/products.controller.js";

const router = Router();

// Ruta para buscar productos por categoría, marca, precio, etc.
router.get('/search', searchProducts);

// Ruta para sugerencias de búsqueda
router.get('/search/suggestions', getSuggestions);

// Ruta para obtener un producto por su ID
router.get('/:id', getProductById);

export default router; // Exporta el router para que pueda ser utilizado en otros archivos