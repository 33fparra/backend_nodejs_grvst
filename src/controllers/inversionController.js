const Inversion = require('../models/inversionModel');

const inversionController = {
  listarInversiones: async (req, res) => {
    try {
      const inversiones = await Inversion.getAll();
      res.json(inversiones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener inversiones' });
    }
  },

  agregarInversion: async (req, res) => {
    const newInversion = req.body;
    try {
      const insertedId = await Inversion.create(newInversion);
      res.json({ message: 'Inversión agregada', id: insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar inversión' });
    }
  },

  obtenerPorID: async (req, res) => {
    const id = req.params.id;

    try {
      const inversion = await Inversion.getById(id);

      if (inversion) {
        res.json(inversion);
      } else {
        res.status(404).json({ error: 'Inversión no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener inversión por ID' });
    }
  },

  editarInversion: async (req, res) => {
    const idInversion = req.params.id; 
    const inversionData = req.body;
  
    try {
      const result = await Inversion.update(idInversion, inversionData);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Inversión actualizada correctamente' });
      } else {
        res.status(200).json({ message: 'No se realizó ningún cambio en la inversión' });
      }
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error al actualizar la inversión' });
    }
  },

  eliminarInversion: async (req, res) => {
    const id = req.params.id;
    try {
      await Inversion.delete(id);
      res.json({ message: 'Inversión eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar inversión' });
    }
  },
};

module.exports = inversionController;
