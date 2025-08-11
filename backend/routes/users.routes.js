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

// Direcciones
router.get('/addresses', auth, usersController.listAddresses);
router.post('/addresses', auth, usersController.createAddress);
router.put('/addresses/:id', auth, usersController.updateAddress);
router.delete('/addresses/:id', auth, usersController.deleteAddress);

export default router;
