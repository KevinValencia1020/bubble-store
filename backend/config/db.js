import 'dotenv/config';
import { Pool } from 'pg';

// Este archivo configura la conexion a la base de datos utilizando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

(async() => {
  try {
    const client = await pool.connect();
    console.log('Conexión a la base de datos exitosa');
    client.release();
  } catch (error) {
    console.log('Error al conectar a la base de datos:', error);
  }
})();

export default pool;