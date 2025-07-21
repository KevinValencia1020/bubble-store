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
        p.price, 
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
      LOWER(p.feature::text) LIKE $${paramIndex} OR
      LOWER(c.name_category) LIKE $${paramIndex} OR
      LOWER(p.brand) LIKE $${paramIndex}
    )`;
      values.push(`%${searchTerms.toLowerCase()}%`);
      paramIndex++;
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

    // Consulta para categorias relacionadas
    let categoryQuery = `
      SELECT DISTINCT c.name_category
      FROM categories c
      INNER JOIN products p ON p.category_id = c.category_id
      WHERE 1=1
    `;
    const categoryValues = [];
    let catParamIndex = 1;

    if (q) {
      const searchCategories = String(q).toLowerCase();
      categoryQuery += ` AND (
        LOWER(c.name_category) LIKE $${catParamIndex}
        OR LOWER(p.product_name) LIKE $${catParamIndex}
        OR LOWER(p.brand) LIKE $${catParamIndex}
      )`;
      categoryValues.push(`%${searchCategories}%`);
      catParamIndex++;
    }

    const { rows: categoryRows } = await pool.query(categoryQuery, categoryValues);

    // Devuelve productos y categorias
    res.json({
      products: productRows,
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
      (SELECT product_name AS suggestion, 'Producto' AS type FROM products WHERE product_name ILIKE $1 || '%' LIMIT 5) UNION
      (SELECT name_category AS suggestion, 'Categoría' AS type FROM categories WHERE name_category ILIKE $1 || '%' LIMIT 3) UNION
      (SELECT brand AS suggestion, 'Marca' AS type FROM products WHERE brand ILIKE $1 || '%' LIMIT 3) 
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