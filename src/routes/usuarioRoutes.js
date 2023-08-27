const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const secureMiddleware = require('../middlewares/secure');

router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obtenerPorID);
router.post('/agregar', usuarioController.agregarUsuario);
router.put('/editar/:id', usuarioController.editarUsuario);
router.delete('/eliminar/:id', usuarioController.eliminarUsuario);

module.exports = router;
