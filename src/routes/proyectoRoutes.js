const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.get('/', proyectoController.listarProyectos);
router.get('/:id', proyectoController.obtenerPorID);
router.post('/agregar', proyectoController.agregarProyecto);
router.put('/editar/:id', proyectoController.editarProyecto);
router.delete('/eliminar/:id', proyectoController.eliminarProyecto);

module.exports = router;
