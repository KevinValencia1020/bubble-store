import { Router } from "express";
import { searchProducts } from "../controllers/products.controller.js";

const router = Router();

// Ruta para buscar productos por categoría, marca, precio, etc.
router.get('/search', searchProducts);

export default router; // Exporta el router para que pueda ser utilizado en otros archivos