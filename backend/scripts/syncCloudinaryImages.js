require('dotenv').config();
const cloudinary = require('../config/cloudinary'); // Importa la configuracion de Cloudinary
const pool = require('../config/db'); // Importa la configuracion de la base de datos

async function syncCloudinaryImages() {
  try {
    const { folders: categoryFolders } = await cloudinary.api.sub_folders('');

    for (const category of categoryFolders) {

      const categoryName = category.name;

      // Obtiene las subcarpetas (productos) dentro de la carpeta de la categoria
      const { folders: productFolders } = await cloudinary.api.sub_folders(category.path);

      for (const product of productFolders) {
        const productName = product.name;

        // Busca el producto en la base de datos que coincida con el nombre de la carpeta
        const prodRes = await pool.query(
          'SELECT product_id FROM products WHERE product_name = $1 LIMIT 1',
          [productName]
        );

        if (prodRes.rows.length === 0) {
          console.log(`Producto no encontrado en la base de datos: ${productName}`);
          continue; // Si no se encuentra el producto, salta al siguiente
        }

        const productId = prodRes.rows[0].product_id;

        // Lista todas las imágenes dentro de la carpeta del producto
      }
    }
  } catch (error) {
    
  }
}
