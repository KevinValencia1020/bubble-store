import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('La variable de entorno DATABASE_URL no está definida. Asegúrate de que esté configurada en tu docker-compose.yml o en tu archivo .env.');
}

// Este archivo configura la conexion a la base de datos utilizando la variable de entorno DATABASE_URL
const pool = new Pool({
  connectionString: connectionString,
});

(async() => {
  try {
    const client = await pool.connect();
    console.log('Conexión a la base de datos exitosa');
    client.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

export default pool;