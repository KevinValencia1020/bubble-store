

export const getProductsByCategory = async(req, res, next) => {

  try {
    /*Obtener productos por categoria
    Extraer la categoria de los parametros de la solicitud*/
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
    
  } catch (error) {
    next(error);
  }
}