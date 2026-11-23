const { Administrador } = require('../Models');

// Crear un administrador
const crearAdmin = async (req, res) => {
  try {
    const { no_empleado, nombre, apellido, contraseña, rol } = req.body;
    const nuevoAdmin = await Administrador.create({
      no_empleado,
      nombre,
      apellido,
      contraseña, // Recomendable aplicar hash con bcrypt después
      rol
    });
    res.status(201).json({ ok: true, data: nuevoAdmin });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Obtener todos los administradores
const obtenerAdmins = async (req, res) => {
  try {
    const admins = await Administrador.findAll({
      attributes: { exclude: ['contraseña'] }
    });
    res.json({ ok: true, data: admins });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  crearAdmin,
  obtenerAdmins
};