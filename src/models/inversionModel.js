const db = require('../../db');

class Inversion {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM inversion', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static create(newInversion) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO inversion SET ?', newInversion, (error, result) => {
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
      const sql = 'SELECT * FROM Inversion WHERE idInversion = ?';
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

  static async update(idInversion, inversionData) {
    try {
      const { montoInversion } = inversionData;
  
      const query = `
        UPDATE inversion
        SET montoInversion = ?
        WHERE idInversion = ?
      `;
  
      const results = await db.query(query, [montoInversion, idInversion]);
      return results;
    } catch (error) {
      throw error; 
    }
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM inversion WHERE idInversion = ?', id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve('Inversión eliminada');
        }
      });
    });
  }
}

module.exports = Inversion;
