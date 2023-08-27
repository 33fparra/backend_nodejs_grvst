const bcrypt = require('bcrypt');

async function generateHash(contrasena) {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(contrasena, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
}

const secureMiddleware = {
  hashPassword: async (req, res, next) => {
    if (req.body.contrasena) {
      try {
        const hashedPassword = await generateHash(req.body.contrasena);
        req.body.contrasena = hashedPassword;
        next();
      } catch (error) {
        res.status(500).json({ error: 'Error al encriptar la contraseña' });
      }
    } else {
      next();
    }
  }
};
//paso 2 desencriptacion de contrasena
async function verificarContrasena(contrasenaIngresada, contrasenaAlmacenada) {
  try {
    return await bcrypt.compare(contrasenaIngresada, contrasenaAlmacenada);
  } catch (error) {
    console.error("Error al verificar la contraseña:", error);
    return false;
  }
}

module.exports = {
  generateHash,
  secureMiddleware,
  verificarContrasena
};
