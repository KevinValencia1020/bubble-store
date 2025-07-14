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
        INNER JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_thumbnail = true
        INNER JOIN categories c ON c.category_id = p.category_id
        WHERE 1 = 1
      `;

    query = `
        SELECT p.product_id, p.product_name, p.price, p.brand, p.stock_quantity
        FROM products p
        INNER JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_thumbnail = true
        ORDER BY p.product_name
      `;
    values = [];

    const { rows } = await pool.query(query, values);
    res.json(rows);

  } catch (error) {
    next(error);
  }
};
