const db = require('../../db');

class Proyecto {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM proyecto', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static create(newProyecto) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO proyecto SET ?', newProyecto, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM proyecto WHERE idProyecto = ?';
      db.query(sql, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.length > 0) {
            resolve(result[0]); 
          } else {
            resolve(null); 
          }
        }
      });
    });
  }

  static async update(id, proyectoData) {
    return new Promise((resolve, reject) => {
      const {
        nombreProyecto,
        descripcionProyecto,
        fechaInicio,
        montoFinanciar,
        montoAdquirido,
        resumenProyecto,
        linkProyecto,
        logoProyecto,
        idCategoria,
        idUsuario
      } = proyectoData;
  
      const query = `
        UPDATE proyecto
        SET nombreProyecto = ?, descripcionProyecto = ?, fechaInicio = ?, montoFinanciar = ?, montoAdquirido = ?, 
            resumenProyecto = ?, linkProyecto = ?, logoProyecto = ?, idCategoria = ?, idUsuario = ?
        WHERE idProyecto = ?`;
  
      const values = [
        nombreProyecto,
        descripcionProyecto,
        fechaInicio,
        montoFinanciar,
        montoAdquirido,
        resumenProyecto,
        linkProyecto,
        logoProyecto,
        idCategoria,
        idUsuario,
        id
      ];
  
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM proyecto WHERE idProyecto = ?', id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve('Proyecto eliminado');
        }
      });
    });
  }
}

module.exports = Proyecto;
