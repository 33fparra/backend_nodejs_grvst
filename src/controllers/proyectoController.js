const Proyecto = require('../models/proyectoModel');

const proyectoController = {
  listarProyectos: async (req, res) => {
    try {
      const proyectos = await Proyecto.getAll();
      res.json(proyectos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener proyectos' });
    }
  },

  agregarProyecto: async (req, res) => {
    const newProyecto = req.body;
    try {
      const insertedId = await Proyecto.create(newProyecto);
      res.json({ message: 'Proyecto agregado', id: insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar proyecto' });
    }
  },

  obtenerPorID: async (req, res) => {
    const id = req.params.id;
  
    try {
      const proyecto = await Proyecto.getById(id);
  
      if (proyecto) {
        res.json(proyecto);
      } else {
        res.status(404).json({ error: 'Proyecto no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener proyecto por ID' });
    }
  },

  editarProyecto: async (req, res) => {
    const idProyecto = req.params.id;
    const proyectoData = req.body;
  
    try {
      const updatedProyecto = await Proyecto.update(idProyecto, proyectoData);
      if (updatedProyecto.affectedRows > 0) {
        res.status(200).json({ message: 'Proyecto actualizado correctamente' });
      } else {
        res.status(404).json({ message: 'Proyecto no encontrado o no se realizó ningún cambio' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el proyecto' });
    }
  },

  eliminarProyecto: async (req, res) => {
    const id = req.params.id;
    try {
      await Proyecto.delete(id);
      res.json({ message: 'Proyecto eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar proyecto' });
      console.log(error);
    }
  },
};

module.exports = proyectoController;
