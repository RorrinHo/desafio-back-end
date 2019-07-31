const express = require('express');
const router = express.Router();

const gateway = require('../controllers/catalogoController');

router.get('/', gateway.obtenerCatalogo);

router.get('/:sku', gateway.obtenerProducto);

module.exports = router;
