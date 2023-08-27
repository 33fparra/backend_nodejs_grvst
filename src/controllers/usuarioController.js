const Usuario = require('../models/usuariomodel');
//const secureMiddleware = require('../middlewares/secure');
const { generateHash, verificarContrasena } = require('../middlewares/secure');


const usuarioController = {
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },
  //paso 4 logeo de usuario
  login: async (req, res) => {

    const { usuario, contrasena } = req.body[0]
    console.log('usuario : ', usuario);
    console.log('contrasena:', contrasena);
    const listarTodoUsuario = await Usuario.getAll();
    const usuarioexiste = listarTodoUsuario.find(ele => ele.username == usuario)
    //esta validacion es cuando no envias nada
    if (!usuario || !contrasena) {
      return res.status(200).json({ status: false, mensaje: "Usuario o Contraseña Incorrecta" });
    }
    //esta validacion es cuando  existe en el find
    if (usuarioexiste) {
      const contrasenaCorrecta = await verificarContrasena(contrasena, usuarioexiste.contrasena);
      //comparando si la contraseña es igual de lo ingresaste con el find
      if (contrasenaCorrecta) {
        return res.status(200).json({ status: true, datos: { usuario: usuarioexiste.nombre, username: usuarioexiste.username, rol: usuarioexiste.idRol } });
      }
      //comparando si la contraseña es difere de lo ingresaste con el find
      else {
        return res.status(200).json({ status: false, mensaje: "Usuario o Contraseña Incorrecta" });
      }

      //esta validacion es cuando no  existe en el find
    } else {
      return res.status(200).json({ status: false, mensaje: "Usuario o Contraseña Incorrecta" });
    }
  },
  //paso 3 agregar usuario encrytado 
  agregarUsuario: async (req, res) => {
    try {
      const usuarios = req.body;
      console.log('obj inicial ', usuarios);

      for (const usuario of usuarios) {
        const hashedPassword = await generateHash(usuario.contrasena);
        usuario.contrasena = hashedPassword;
      }
      console.log('obj final ', usuarios);

      const insertedId = await Usuario.create(usuarios);
      res.json({ message: 'Usuario agregado', id: insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar usuario' });
    }
  },

  obtenerPorID: async (req, res) => {
    const id = req.params.id;

    try {
      const usuario = await Usuario.getById(id);

      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario por ID' });
    }
  },

  editarUsuario: async (req, res) => {
    const idUsuario = req.params.id;
    const userData = req.body;

    try {
      const updatedUser = await Usuario.update(idUsuario, userData);
      if (updatedUser.affectedRows > 0) {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  },

  eliminarUsuario: async (req, res) => {
    const id = req.params.id;
    try {
      await Usuario.delete(id);
      res.json({ message: 'Usuario eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  },
};

module.exports = usuarioController;

