const CatalogoService  = require('../services/catalogoService')

exports.obtenerCatalogo = async (req, res) => {
  try {
    const productos = await CatalogoService.buscarCatalogo();

    res.json({ productos });

  } catch (error) {
    console.log("ERROR "+error); 
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    const sku = req.params.sku;
    const producto = await CatalogoService.buscarProducto(sku);

    res.json({ producto });
  } catch (error) {

  }
}
