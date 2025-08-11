import express from 'express';
const router = express.Router();
import * as usersController from '../controllers/users.controller.js';
import auth from '../middleware/auth.js';

// Ruta para login (correo y contraseña)
router.post('/login', usersController.loginUser);

// Ruta para registro de usuario
router.post('/register', usersController.registerUser);

// Obtener perfil
router.get('/profile', auth, usersController.getProfile);
// Actualizar perfil
router.put('/profile', auth, usersController.updateProfile);
// Cambiar contraseña
router.post('/change-password', auth, usersController.changePassword);

export default router;
