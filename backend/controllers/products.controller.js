import pool from '../config/db.js';

export const searchProducts = async (req, res, next) => {

  try {
    const { category, keyword, minPrice, maxPrice, brand } = req.query;

    let query = `
    SELECT p.product_name, 
    p.price, 
    p.brand, 
    p.stock_quantity,
    pi.image_url AS thumbnail
    FROM products p
    INNER JOIN product_images pi ON pi.product_id = p.product_idAND pi.is_thumbnail = true
    INNER JOIN categories c ON c.category_id = p.category_id
    WHERE 1 = 1
    `;

    const values = [];

    if (category && category !== 'all') { // Filtra por categoría si se proporciona
      query += `AND LOWER(c.category_name) = $${values.length + 1} `;
      values.push(category.toLowerCase());
    }

    if (keyword) { // Filtra por palabra clave si se proporciona
      query += `AND (LOWER(P.product_name) LIKE $${values.length +1} OR LOWER(p.brand) LIKE $${values.length + 1})`;
      values.push(`%${keyword.toLowerCase()}%`);
    }
    const { rows } = await pool.query(query, values);
    res.json(rows);

  } catch (error) {
    next(error);
  }
};
