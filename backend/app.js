import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRoutes from './routes/products.routes.js';

const app = express();

// Middleware
app.use(cors()); // Permite solicitudes desde otros orígenes (frontend)
app.use(express.json()); // Analiza el cuerpo de las solicitudes JSON
app.use(morgan('dev')); // Registra las solicitudes HTTP en la consola

app.use('/api/products', productsRoutes); // Rutas de productos