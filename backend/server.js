import 'dotenv/config' // Carga las variables de entorno desde el archivo .env
import app from './app.js';

// Escucha el puerto desde la variable de entorno o usa el puerto 4000 por defecto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto', PORT);
});