const mysql2 = require('mysql2');
const config = require('./config/config');

const db = mysql2.createConnection(config.dbConfig);

db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

module.exports = db;
