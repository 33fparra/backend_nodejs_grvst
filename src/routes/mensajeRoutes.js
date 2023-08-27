const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');

router.get('/', mensajeController.listarMensajes);
router.get('/:id', mensajeController.obtenerPorID);
router.post('/agregar', mensajeController.agregarMensaje);
router.put('/editar/:id', mensajeController.editarMensaje);
router.delete('/eliminar/:id', mensajeController.eliminarMensaje);

module.exports = router;
