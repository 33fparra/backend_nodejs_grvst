const Mensaje = require('../models/mensajeModel');

const mensajeController = {
  listarMensajes: async (req, res) => {
    try {
      const mensajes = await Mensaje.getAll();
      res.json(mensajes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener mensajes' });
    }
  },

  agregarMensaje: async (req, res) => {
    const newMensaje = req.body;
    try {
      const insertedId = await Mensaje.create(newMensaje);
      res.json({ message: 'Mensaje agregado', id: insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar mensaje' });
    }
  },

  obtenerPorID: async (req, res) => {
    const id = req.params.id;

    try {
      const mensaje = await Mensaje.getById(id);

      if (mensaje) {
        res.json(mensaje);
      } else {
        res.status(404).json({ error: 'Mensaje no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener mensaje por ID' });
    }
  },

  editarMensaje: async (req, res) => {
    const idMensaje = req.params.id; 
    const mensajeData = req.body;
  
    try {
      const result = await Mensaje.update(idMensaje, mensajeData);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Mensaje actualizado correctamente' });
      } else {
        res.status(200).json({ message: 'Mensaje actualizado correctamente' });
      }
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error al actualizar el mensaje' });
    }
  },

  eliminarMensaje: async (req, res) => {
    const id = req.params.id;
    try {
      await Mensaje.delete(id);
      res.json({ message: 'Mensaje eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar mensaje' });
    }
  },
};

module.exports = mensajeController;
