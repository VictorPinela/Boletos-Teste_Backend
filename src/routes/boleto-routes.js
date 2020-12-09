const express = require('express');
const router = express.Router();
const boletoController = require('../controllers/boleto-controller');

router.get('/', boletoController.listBoletos);
router.post('/', boletoController.createBoleto);

module.exports = router;