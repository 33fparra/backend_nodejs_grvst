const db = require('../../db');

class Mensaje {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM mensaje', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static create(newMensaje) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO mensaje SET ?', newMensaje, (error, result) => {
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
      const sql = 'SELECT * FROM Mensaje WHERE idMensaje = ?';
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

  static async update(idMensaje, mensajeData) {
    try {
      const { contenidoMensaje } = mensajeData;
  
      const query = `
        UPDATE mensaje
        SET contenidoMensaje = ?
        WHERE idMensaje = ?
      `;
  
      const results = await db.query(query, [contenidoMensaje, idMensaje]);
      return results;
    } catch (error) {
      throw error; 
    }
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM mensaje WHERE idMensaje = ?', id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve('Mensaje eliminado');
        }
      });
    });
  }
}

module.exports = Mensaje;
