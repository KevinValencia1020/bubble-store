import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
export default function auth(req, res, next) {
  
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  let token = null;
  // Verifica si el token está en el encabezado Authorization o en x-auth-token
  if (authHeader && authHeader.startsWith('Bearer ')) {
    //
    token = authHeader.substring(7);

  } else if (req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado: token faltante' });
  }

  try {
    // Verifica y decodifica el token
    const secret = process.env.JWT_SECRET || 'tu_clave_secreta';
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // { user_id, email }
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
