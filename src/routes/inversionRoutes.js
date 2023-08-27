const express = require('express');
const router = express.Router();
const inversionController = require('../controllers/inversionController');

router.get('/', inversionController.listarInversiones);
router.get('/:id', inversionController.obtenerPorID);
router.post('/agregar', inversionController.agregarInversion);
router.put('/editar/:id', inversionController.editarInversion);
router.delete('/eliminar/:id', inversionController.eliminarInversion);

module.exports = router;
