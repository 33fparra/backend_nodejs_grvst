const db = require('../../db');

class Usuario {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static create(newUser) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO usuario SET ?', newUser, (error, result) => {
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
      const sql = 'SELECT * FROM Usuario WHERE idUsuario = ?';
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

  static async update(id, userData) {
    return new Promise((resolve, reject) => {
      const { nombre, apellido, username, contrasena, correo, direccion, idComuna, idRegion, idRol, telefono } = userData;

      const query = `
        UPDATE usuario
        SET nombre = ?, apellido = ?, username = ?, contrasena = ?, correo = ?, direccion = ?, idComuna = ?, idRegion = ?, idRol = ?, telefono = ?
        WHERE idUsuario = ?`;

      const values = [nombre, apellido, username, contrasena, correo, direccion, idComuna, idRegion, idRol, telefono, id];

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
      db.query('DELETE FROM usuario WHERE idUsuario = ?', id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve('Usuario eliminado');
        }
      });
    });
  }
}

module.exports = Usuario;