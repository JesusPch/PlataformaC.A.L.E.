const { Alumno, ActividadAlumno, ActividadAdmin } = require('../Models');

// Obtener las entregas/actividades asignadas a un alumno
const obtenerEntregasPorAlumno = async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const alumno = await Alumno.findByPk(id_alumno);

    if (!alumno) {
      return res.status(404).json({ ok: false, message: 'Alumno no encontrado' });
    }

    if (alumno.estado !== 'autorizado') {
      return res.status(403).json({
        ok: false,
        message: 'El alumno no está autorizado para acceder a sus actividades'
      });
    }

    const entregas = await ActividadAlumno.findAll({
      where: { id_alumno },
      include: [{ model: ActividadAdmin, as: 'actividad_info' }]
    });
    res.json({ ok: true, data: entregas });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Registrar/Actualizar evidencia subida a MinIO por el alumno
const entregarEvidencia = async (req, res) => {
  try {
    const { id_evidencia } = req.params;
    const { object_key, bucket_name, mime_type, file_size_bytes } = req.body;

    const entrega = await ActividadAlumno.findByPk(id_evidencia);
    if (!entrega) {
      return res.status(404).json({ ok: false, message: 'Registro de entrega no encontrado' });
    }

    const alumno = await Alumno.findByPk(entrega.id_alumno);
    if (!alumno || alumno.estado !== 'autorizado') {
      return res.status(403).json({
        ok: false,
        message: 'El alumno no está autorizado para entregar evidencias'
      });
    }

    entrega.object_key = object_key;
    entrega.bucket_name = bucket_name || 'entregas-alumnos';
    entrega.mime_type = mime_type || 'application/pdf';
    entrega.file_size_bytes = file_size_bytes;
    entrega.estado = 'Pendiente';
    entrega.fecha = new Date();

    await entrega.save();
    res.json({ ok: true, message: 'Evidencia registrada con éxito', data: entrega });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Evaluar entrega (Aprobar o Rechazar por el Administrador)
const evaluarEntrega = async (req, res) => {
  try {
    const { id_evidencia } = req.params;
    const { estado, comentario } = req.body; // estado: 'aprobado' o 'rechasado'

    const entrega = await ActividadAlumno.findByPk(id_evidencia);
    if (!entrega) {
      return res.status(404).json({ ok: false, message: 'Registro de entrega no encontrado' });
    }

    entrega.estado = estado;
    entrega.comentario = comentario;
    entrega.fecha_evaluacion = new Date();

    await entrega.save();
    res.json({ ok: true, message: `Actividad ${estado}`, data: entrega });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  obtenerEntregasPorAlumno,
  entregarEvidencia,
  evaluarEntrega
};