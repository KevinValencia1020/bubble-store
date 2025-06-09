import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(cors()); // Permite solicitudes desde otros orígenes (frontend)
app.use(express.json()); // Analiza el cuerpo de las solicitudes JSON
app.use(morgan('dev')); // Registra las solicitudes HTTP en la consola