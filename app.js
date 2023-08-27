const express = require('express');
const cors = require('cors');
const app = express();

const { secureMiddleware } = require('./src/middlewares/secure');


const config = require('./config/config');

app.use(express.json());
app.use(cors());
app.use(secureMiddleware.hashPassword);

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const mensajeRoutes = require('./src/routes/mensajeRoutes');
const proyectoRoutes = require('./src/routes/proyectoRoutes'); 
const inversionRoutes = require('./src/routes/inversionRoutes');

app.use('/usuario', usuarioRoutes);
app.use('/mensaje', mensajeRoutes); 
app.use('/proyecto', proyectoRoutes); 
app.use('/inversion', inversionRoutes); 



app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API backend Griinvest!');
});

app.listen(config.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
