  require('dotenv').config();


  module.exports = {
    port: process.env.PORT || 3000,
    dbConfig: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'bdgriinvest' //'databasegrvst'
    }
  };