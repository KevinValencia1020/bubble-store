import { Router } from "express";
import { searchProducts, getSuggestions } from "../controllers/products.controller.js";

const router = Router();

// Ruta para buscar productos por categoría, marca, precio, etc.
router.get('/search', searchProducts);

// Ruta para sugerencias de búsqueda
router.get('/search/suggestions', getSuggestions);

export default router; // Exporta el router para que pueda ser utilizado en otros archivos