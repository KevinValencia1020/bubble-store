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

// Obtener perfil del usuario autenticado
export const getProfile = async (req, res) => {

  try {
    const { user_id } = req.user; // seteado por middleware auth

    const result = await pool.query('SELECT user_id, name, lastname, email, role, created_at FROM users WHERE user_id = $1', [user_id]);
    
    if (result.rows.length === 0) return res.status(404).json({
      message: 'Usuario no encontrado'
    });

    res.json({ user: result.rows[0] });

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Actualizar datos de perfil (name, lastname, email opcional)
export const updateProfile = async (req, res) => {

  const { name, lastname, email } = req.body;
  const { user_id } = req.user;

  if (!name || !lastname) {
    return res.status(400).json({ message: 'Nombre y apellido requeridos' });
  }
  try {
    // Si cambia email verificar que no exista
    if (email) {

      const exists = await pool.query('SELECT user_id FROM users WHERE email = $1 AND user_id <> $2', [email, user_id]);

      if (exists.rows.length > 0) {

        return res.status(409).json({ message: 'El correo ya está en uso por otro usuario' });
      }
    }

    const result = await pool.query(
      `UPDATE users SET name = $1, lastname = $2, email = COALESCE($3, email), updated_at = NOW() WHERE user_id = $4 RETURNING user_id, name, lastname, email, role, updated_at`,
      [name, lastname, email || null, user_id]
    );

    res.json({ message: 'Perfil actualizado', user: result.rows[0] });

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Cambiar contraseña
export const changePassword = async (req, res) => {

  const { currentPassword, newPassword, confirmPassword } = req.body;
  const { user_id } = req.user;

  if (!currentPassword || !newPassword || !confirmPassword) {

    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  if (newPassword !== confirmPassword) {

    return res.status(400).json({ message: 'Las contraseñas nuevas no coinciden' });
  }

  try {
    // Verificar contraseña actual
    const result = await pool.query('SELECT password_hash FROM users WHERE user_id = $1', [user_id]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(currentPassword, user.password_hash);

    if (!valid) return res.status(401).json({ message: 'Contraseña actual incorrecta' });

    const newHash = await bcrypt.hash(newPassword, 10);

    await pool.query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE user_id = $2', [newHash, user_id]);
    res.json({ message: 'Contraseña actualizada correctamente' });

  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Direcciones
export const listAddresses = async (req, res) => {
  const { user_id } = req.user;
  try {
    const result = await pool.query('SELECT * FROM user_addresses WHERE user_id = $1 AND is_active = true ORDER BY is_default DESC, updated_at DESC', [user_id]);
    res.json({ addresses: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error al listar direcciones' });
  }
};

export const createAddress = async (req, res) => {
  const { user_id } = req.user;
  const { recipient_name, phone, document_id, country_code = 'CO', state, city, neighborhood, postal_code, address_line1, address_line2, reference, latitude, longitude, is_default } = req.body;

  if (!recipient_name || !state || !city || !address_line1) {
    return res.status(400).json({ message: 'Campos obligatorios faltantes' });
  }

  try {

    const result = await pool.query(`INSERT INTO user_addresses (user_id, recipient_name, phone, document_id, country_code, state, city, neighborhood, postal_code, address_line1, address_line2, reference, latitude, longitude, is_default)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,COALESCE($15,false)) RETURNING *`,
      [user_id, recipient_name, phone, document_id, country_code, state, city, neighborhood, postal_code, address_line1, address_line2, reference, latitude, longitude, is_default]);

    res.status(201).json({ message: 'Dirección creada', address: result.rows[0] });

  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Dirección duplicada' });
    }
    res.status(500).json({ message: 'Error al crear dirección' });
  }
};

export const updateAddress = async (req, res) => {

  const { user_id } = req.user;
  const { id } = req.params;
  const { recipient_name, phone, document_id, country_code, state, city, neighborhood, postal_code, address_line1, address_line2, reference, latitude, longitude, is_default, is_active } = req.body;

  try {

    const result = await pool.query(`UPDATE user_addresses SET
      recipient_name = COALESCE($1,recipient_name),
      phone = COALESCE($2,phone),
      document_id = COALESCE($3,document_id),
      country_code = COALESCE($4,country_code),
      state = COALESCE($5,state),
      city = COALESCE($6,city),
      neighborhood = COALESCE($7,neighborhood),
      postal_code = COALESCE($8,postal_code),
      address_line1 = COALESCE($9,address_line1),
      address_line2 = COALESCE($10,address_line2),
      reference = COALESCE($11,reference),
      latitude = COALESCE($12,latitude),
      longitude = COALESCE($13,longitude),
      is_default = COALESCE($14,is_default),
      is_active = COALESCE($15,is_active),
      updated_at = NOW()
      WHERE address_id = $16 AND user_id = $17 RETURNING *`,
      [recipient_name, phone, document_id, country_code, state, city, neighborhood, postal_code, address_line1, address_line2, reference, latitude, longitude, is_default, is_active, id, user_id]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'Dirección no encontrada' });

    res.json({ message: 'Dirección actualizada', address: result.rows[0] });

  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar dirección' });
  }
};

export const deleteAddress = async (req, res) => {

  const { user_id } = req.user;
  const { id } = req.params;

  try {

    const result = await pool.query('UPDATE user_addresses SET is_active = false, updated_at = NOW() WHERE address_id = $1 AND user_id = $2 RETURNING address_id', [id, user_id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Dirección no encontrada' });
    res.json({ message: 'Dirección eliminada' });
    
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar dirección' });
  }
};
