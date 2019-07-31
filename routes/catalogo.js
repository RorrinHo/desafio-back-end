const express = require('express');
const router = express.Router();

const gateway = require('../controllers/catalogoController');

router.get('/', cors(), gateway.obtenerCatalogo);

router.get('/:sku', cors(), gateway.obtenerProducto);

module.exports = router;
