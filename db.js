const mysql = require('mysql');
const config = require('./config/config');

const db = mysql.createConnection(config.dbConfig);

db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

module.exports = db;
