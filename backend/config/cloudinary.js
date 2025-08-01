import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'; 

config(); // Carga las variables de entorno desde el archivo .env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export default cloudinary;