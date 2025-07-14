import pool from '../config/db.js';

export const searchProducts = async (req, res, next) => {

  try {
    const { 
      category, 
      keyword, 
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
        p.price, 
        p.brand, 
        p.stock_quantity,
        pi.image_url AS thumbnail
      FROM products p
      INNER JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_thumbnail = true
      INNER JOIN categories c ON c.category_id = c.category_id
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

    if (keyword) {
      // Convierto el JSONB a string para poder usar LIKE
      query += ` AND (LOWER(p.product_name) LIKE $${paramIndex} OR LOWER(p.feature::text) LIKE $${paramIndex}) `;
      values.push(`%${keyword.toLowerCase()}%`);
      paramIndex++;
      // Separa el termino de busqueda en palabras individuales
      const searchTerms = keyword.toLowerCase().split(' ').filter(term => term);

      searchProducts.forEach(term => {
        query += ` AND (LOWER(p.product_name) LIKE $${paramIndex} OR LOWER(p.feature::text) LIKE $${paramIndex}}) `;
        values.push(`%${term}%`);
        paramIndex++;
      });
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

    const { rows } = await pool.query(query, values);
    res.json(rows);

  } catch (error) {
    console.error('Error al buscar productos', error);
    next(error);
  }
};
