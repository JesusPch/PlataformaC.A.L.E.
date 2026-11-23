const { ActividadAdmin, Administrador } = require('../Models');

// Crear actividad en el catálogo general
const crearActividad = async (req, res) => {
  try {
    const { titulo_actividad, pdf_actividad_key, id_usuario, descripcion } = req.body;
    const nuevaActividad = await ActividadAdmin.create({
      titulo_actividad,
      pdf_actividad_key,
      id_usuario,
      descripcion
    });
    res.status(201).json({ ok: true, data: nuevaActividad });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Listar todas las actividades del catálogo
const obtenerActividades = async (req, res) => {
  try {
    const actividades = await ActividadAdmin.findAll({
      include: [{ model: Administrador, as: 'creador', attributes: ['id_usuario', 'nombre', 'apellido'] }]
    });
    res.json({ ok: true, data: actividades });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  crearActividad,
  obtenerActividades
};