import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// Iniciar sesión usando PostgreSQL y redirigir si el usuario no existe
export const loginUser = async (req, res) => { 
  
  let email, password;
  if (req.body) {
    email = req.body.email;
    password = req.body.password;
  }
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña requeridos', body: req.body });
  }

  try {
    // Verificar si el usuario existe [email]
  const result = await pool.query('SELECT user_id, email, password_hash, name, lastname FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      // Usuario no existe, indicar al frontend que debe ir a registro
      return res.status(404).json({ message: 'Usuario no registrado', redirectToRegister: true });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, 'tu_clave_secreta', { expiresIn: '1h' });

    res.json({ 
    message: 'Login exitoso',
    user: { user_id: user.user_id, email: user.email, name: user.name, lastname: user.lastname },
    token
    });

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Registrar usuario nuevo
export const registerUser = async (req, res) => {

  const { email, name, lastname, password, confirmPassword } = req.body;

  if (!email || !name || !lastname || !password) {
    return res.status(400).json({ message: 'Todos los campos obligatorios' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  try {
    // Verificar si el correo ya está registrado
    const exists = await pool.query('SELECT user_id FROM users WHERE email = $1', [email]);

    if (exists.rows.length > 0) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }
    // Encriptar contraseña
    const password_hash = await bcrypt.hash(password, 10);
    // Insertar usuario con rol por defecto 'cliente'
    await pool.query(
      'INSERT INTO users (name, lastname, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)',
      [name, lastname, email, password_hash, 'cliente']
    );

    res.json({ message: 'Usuario registrado correctamente' });

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};
