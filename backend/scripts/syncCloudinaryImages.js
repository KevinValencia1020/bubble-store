import cloudinary from '../config/cloudinary.js'; // Importa la configuracion de Cloudinary
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);

import pool from '../config/db.js'; // Importa la configuracion de la base de datos

async function syncCloudinaryImages() {

  const allResources = await cloudinary.api.resources({
    type: 'upload',
    max_results: 500,
  });

  console.log('Ejemplo de public_id encontrados en Home/:');
  allResources.resources.forEach((resource) => {
    console.log(resource.public_id);
  });
  
  try {

    const productsRes = await pool.query(
      `SELECT product_id, product_name FROM products`);
    const products = productsRes.rows;

    for (const product of products) {

      const productName = product.product_name;
      const product_id = product.product_id;
      
      const resources = await cloudinary.api.resources({
        type: 'upload', // Tipo de recurso
        prefix: productName, // Utiliza el nombre del producto como prefijo
        max_results: 500, // Limita a 500 resultados por solicitud
      });

      console.log('imagenes encontradas:', resources.resources.length, 'para el producto:', productName);

      // Verifica si hay imágenes para sincronizar
      for (let i = 0; i < resources.resources.length; i++) {
          const image = resources.resources[i];
          const image_url = image.secure_url;
          const is_thumbnail = i === resources.resources.length-1; // Marca la ultima imagen como miniatura
          const display_order = i + 1; // Orden de visualización basado en el índice

          try {

            console.log(`Sincronizando imagen: ${image_url} para el producto: ${productName} (ID: ${product_id})`);

            // Inserta la imagen en la base de datos
            await pool.query(
              'INSERT INTO product_images (product_id, image_url, is_thumbnail, display_order) VALUES ($1, $2, $3, $4) ON CONFLICT (product_id, image_url) DO NOTHING',
              [product_id, image_url, is_thumbnail, display_order]
            );

            console.log(`Imagen sincronizada: ${image_url} para el producto: ${productName} (ID: ${product_id})`);

          } catch (err) {
            // Manejo de errores al insertar la imagen
            console.log(`Error al insertar imagen: ${image_url} para el producto: ${productName} (ID: ${product_id}): ${err.message}`);
          }
        }
        console.log(`Imágenes sincronizadas para el producto: ${productName} (ID: ${product_id})`);
      }

      console.log('Sincronización de imágenes completada.');
      process.exit(0);

    } catch (error) {
    
    console.log(`Error durante la sincronización de imágenes: ${error.message}`);
    process.exit(1);
  }

}

syncCloudinaryImages();