import express from 'express';
const router = express.Router();
import * as usersController from '../controllers/users.controller.js';

// Ruta para login (correo y contraseña)
router.post('/login', usersController.loginUser);

// Ruta para registro de usuario
router.post('/register', usersController.registerUser);

export default router;
