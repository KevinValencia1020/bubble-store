import { Router } from "express";
import { getProductsByCategory } from "../controllers/products.controller.js";

const router = Router();

router.get('/category/:category', getProductsByCategory); // Ruta para obtener productos por categoría (por nombre de categoría)

export default router; // Exporta el router para que pueda ser utilizado en otros archivos