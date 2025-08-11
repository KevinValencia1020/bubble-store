import pool from '../config/db.js';

export const searchProducts = async (req, res, next) => {

  try {
    const { 
      category,
      q,
      minPrice, 
      maxPrice, 
      brand,
      sortBy,
      sortOrder,
      page = 1,
      limit = 12,
     } = req.query;

    let query = `
      SELECT 
        p.product_id,
        p.product_name, 
        /* Normalización de precios inflados x100 (heurística) */
        CASE 
          WHEN p.price >= 10000000 AND (p.price::bigint % 100) = 0 AND (p.price / 100) >= 10000 THEN p.price / 100
          ELSE p.price
        END AS price,
        p.brand, 
        p.stock_quantity,
        pi.image_url AS thumbnail
      FROM products p
      INNER JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_thumbnail = true
      INNER JOIN categories c ON p.category_id = c.category_id
      WHERE 1 = 1
    `;

    const values = [];
    let paramIndex = 1;

    if (category && category !== 'all') { // Filtra por categoría si se proporciona
      query += ` AND LOWER(c.name_category) = $${paramIndex++} `;
      values.push(category.toLowerCase());
    }

    // Filtro por marca puede ser una o varias marcas separadas por comas
    if (brand) {
      const brands = brand.split(',').map(b => b.trim().toLowerCase());

      if (brands.length > 0) {
        query += ` AND LOWER(p.brand) = ANY($${paramIndex++}) `;
        values.push(brands);
      }
    }

    if (q) {
      const searchTerms = `%${q.toLowerCase()}%`;
      // Convierto el JSONB a string para poder usar LIKE
      query += ` AND (
      LOWER(p.product_name) LIKE $${paramIndex} OR 
      LOWER(p.feature::text) LIKE $${paramIndex + 1} OR
      LOWER(c.name_category) LIKE $${paramIndex + 2} OR
      LOWER(p.brand) LIKE $${paramIndex + 3}
    )`;
      values.push(searchTerms, searchTerms, searchTerms, searchTerms);
      paramIndex += 4;
    }

    // Filtro por precio minimo
    if (minPrice) {
      query += ` AND p.price >= $${paramIndex++}`;
      values.push(parseFloat(minPrice));
    }

    // Filtro por precio máximo
    if (maxPrice) {
      query += ` AND p.price <= $${paramIndex++}`;
      values.push(parseFloat(maxPrice));
    }

    // Ordenamiento
    const validSortBy = ['price', 'product_name', 'brand']; // Campos validos para ordenar
    const validSortOrder = ['ASC', 'DESC']; // Orden validos

    const orderBy = validSortBy.includes(sortBy) ? `p.${sortBy}` : 'p.product_name';
    const order = validSortOrder.includes(sortOrder?.toUpperCase()) ? sortOrder.toUpperCase() : 'ASC';

    query += ` ORDER BY ${orderBy} ${order}`;

    // Paginación
    const offset = (page - 1) * limit;
    query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    values.push(parseInt(limit), parseInt(offset));

    const { rows: productRows } = await pool.query(query, values);
    
    const normalizePrice = (raw) => {
      let price = Number(raw.price ?? raw);
      if (!Number.isFinite(price)) return raw.price ?? raw;
      // Divide repetidamente entre 100 si parece inflado (factor 100 multiple) manteniendo un minimo razonable
      let iterations = 0;
      while (price >= 10000000 && price % 100 === 0 && iterations < 3) {

        const candidate = price / 100;
        if (candidate < 10000) break; // evita caer a valores absurdamente bajos
        price = candidate;
        iterations++;
      }
      return price;
    };
    
    const normalizedProductRows = productRows.map(r => ({ ...r, price: normalizePrice(r) }));

    // Esto asegura que las categorías mostradas realmente contengan productos que coincidan con TODOS los filtros.
    const categoryQuery = `SELECT DISTINCT c.name_category ${query.substring(query.indexOf('FROM products'))}`;

    
    // Usamos slice(0, -2) para obtener una copia de todos los valores EXCEPTO los dos últimos.
    const categoryValues = values.slice(0, -2);

    const { rows: categoryRows } = await pool.query(
      categoryQuery.substring(0, categoryQuery.indexOf('ORDER BY')), // Quita ORDER BY, LIMIT y OFFSET
      categoryValues
    );

    // Devuelve productos y categorias
    res.json({
      products: normalizedProductRows,
      categories: categoryRows.map(row => row.name_category),
    });

  } catch (error) {
    console.error('Error al buscar productos', error);
    next(error);
  }
};

export const getSuggestions = async (req, res, next) => {

  try {

    const { term } = req.query;

    if (!term || term.trim() === '') { // Si no hay término de búsqueda, devuelve un array vacío
      return res.json([]);
    }
    
    const query = `
      (SELECT product_id, product_name AS suggestion, 'Producto' AS type 
      FROM products 
      WHERE product_name ILIKE $1 || '%' LIMIT 5
      ) UNION
      (
        SELECT NULL AS product_id, name_category AS suggestion, 'Categoría' AS type 
        FROM categories 
        WHERE name_category ILIKE $1 || '%' LIMIT 3
      ) UNION
      (
        SELECT NULL AS product_id, brand AS suggestion, 'Marca' AS type 
        FROM products 
        WHERE brand ILIKE $1 || '%' 
        LIMIT 3
      ) 
      LIMIT 10;
    `;

    const values = [term.trim()];

    // Ejecuto la consulta y devuelvo los resultados
    const { rows } = await pool.query(query, values);
    res.json(rows);
    
  } catch (error) {

    console.error('Error al obtener sugerencias', error);
    next(error);
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const numericId = Number(id);

    // Consulta para traer los datos del producto y sus características
    const productQuery = `
      SELECT 
        p.product_id, 
        p.product_name, 
        CASE 
          WHEN p.price >= 10000000 AND (p.price::bigint % 100) = 0 AND (p.price / 100) >= 10000 THEN p.price / 100
          ELSE p.price
        END AS price, 
        p.brand, 
        p.stock_quantity, 
        p.feature
      FROM products p
      WHERE p.product_id = $1
      LIMIT 1
    `;
    const { rows: productRows } = await pool.query(productQuery, [numericId]);
    if (productRows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });

    // Consulta para traer todas las imágenes del producto
    const imagesQuery = `
      SELECT image_url 
      FROM product_images 
      WHERE product_id = $1
      ORDER BY is_thumbnail DESC, image_url
    `;
    const { rows: imageRows } = await pool.query(imagesQuery, [numericId]);
    const images = imageRows.map(row => row.image_url);

    // Construye el objeto de respuesta
    // Reutilizamos normalización
    const normalizePrice = (val) => {
      let price = Number(val);
      if (!Number.isFinite(price)) return val;
      let i=0; 
      while (price >= 10000000 && price % 100 === 0 && i<3) { const c = price/100; if (c < 10000) break; price = c; i++; }
      return price;
    };
    const product = {
      id: productRows[0].product_id,
      name: productRows[0].product_name,
      price: normalizePrice(productRows[0].price),
      brand: productRows[0].brand,
      stock: productRows[0].stock_quantity,
      feature: productRows[0].feature,
      image: images
    };

    res.json(product);
  } catch (error) {
    console.error('Error al obtener producto por ID', error);
    next(error);
  }
}