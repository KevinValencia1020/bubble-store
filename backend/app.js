import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRoutes from './routes/products.routes.js';
import usersRoutes from './routes/users.routes.js';

const app = express();

// Middleware
app.use(cors()); // Permite solicitudes desde otros orígenes (frontend)
app.use(express.json()); // Analiza el cuerpo de las solicitudes JSON
app.use(morgan('dev')); // Registra las solicitudes HTTP en la consola
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRoutes); // Rutas de productos
app.use('/api/users', usersRoutes); // Rutas de usuarios

export default app; // Exporta la aplicación para que pueda ser utilizada en otros archivos