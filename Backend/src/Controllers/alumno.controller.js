const { randomUUID } = require('crypto');
const multer = require('multer');
const { pipeline } = require('node:stream/promises');
const { sequelize, Alumno, ActividadAlumno, ActividadAdmin } = require('../Models');
const { downloadPdf, uploadPdf } = require('../Services/minio');

// Mantiene el archivo en memoria para validarlo antes de enviarlo a MinIO.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }
});

// Procesa el campo multipart "file" y convierte los errores de Multer en respuestas HTTP.
const cargarRecibo = (req, res, next) => {
  upload.single('file')(req, res, (error) => {
    if (!error) {
      return next();
    }

    // Distingue el límite de tamaño del resto de errores de carga.
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        ok: false,
        error: 'El PDF no puede superar los 5 MB.'
      });
    }

    return res.status(400).json({
      ok: false,
      error: 'No se pudo procesar el archivo PDF.'
    });
  });
};

// Evita consultar recibos fuera de pruebas explícitamente habilitadas en la máquina local.
const soloVistaLocalDeRecibos = (req, res, next) => {
  const loopbackAddresses = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];
  const esLocal = loopbackAddresses.includes(req.socket.remoteAddress);

  // La variable de entorno no habilita esta ruta en producción ni desde otra dirección.
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.ENABLE_LOCAL_RECEIPT_PREVIEW !== 'true' ||
    !esLocal
  ) {
    return res.status(403).json({
      ok: false,
      error: 'La consulta de recibos solo está habilitada para pruebas locales.'
    });
  }

  return next();
};

// Valida y guarda en MinIO el PDF del recibo; responde con la clave que después se asocia al alumno.
const subirRecibo = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ ok: false, error: 'Selecciona un archivo PDF.' });
  }

  // Comprueba tanto el tipo MIME declarado por el cliente como la firma inicial del archivo.
  if (
    file.mimetype !== 'application/pdf' ||
    file.buffer.subarray(0, 5).toString('ascii') !== '%PDF-'
  ) {
    return res.status(400).json({ ok: false, error: 'El archivo debe ser un PDF válido.' });
  }

  // Usa un identificador aleatorio para evitar colisiones y nombres controlados por el usuario.
  const objectKey = `alumnos/inscripciones/${randomUUID()}.pdf`;

  try {
    await uploadPdf(objectKey, file.buffer);
    res.status(201).json({
      ok: true,
      data: { pdf_registro_key: objectKey }
    });
  } catch (error) {
    res.status(502).json({
      ok: false,
      error: `No se pudo guardar el recibo en MinIO: ${error.message}`
    });
  }
};

// Crea el alumno y sus asignaciones iniciales de actividades dentro de una sola transacción.
const crearAlumno = async (req, res) => {
  try {
    const nuevoAlumno = await sequelize.transaction(async (transaction) => {
      const alumno = await Alumno.create(req.body, { transaction });
      // Solo se asignan las actividades que ya existen en el catálogo al momento del registro.
      const actividades = await ActividadAdmin.findAll({
        attributes: ['id_actividad'],
        transaction
      });

      // No genera asignaciones si el catálogo está vacío.
      if (actividades.length > 0) {
        await ActividadAlumno.bulkCreate(
          actividades.map(({ id_actividad }) => ({
            id_alumno: alumno.id_alumno,
            id_actividad
          })),
          { transaction }
        );
      }

      return alumno;
    });

    // Nunca se devuelve la contraseña incluida en el registro del alumno.
    const alumnoCreado = nuevoAlumno.toJSON();
    delete alumnoCreado.contraseña;
    res.status(201).json({ ok: true, data: alumnoCreado });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Devuelve el listado de alumnos sin incluir sus contraseñas.
const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll({
      attributes: { exclude: ['contraseña'] }
    });
    res.json({ ok: true, data: alumnos });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Devuelve el perfil de un alumno; sus entregas solo se consultan si ya está autorizado.
const obtenerAlumnoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const alumno = await Alumno.findByPk(id, {
      attributes: { exclude: ['contraseña'] }
    });

    if (!alumno) {
      return res.status(404).json({ ok: false, message: 'Alumno no encontrado' });
    }

    // Mantiene la restricción de acceso: alumnos en otros estados reciben una lista vacía.
    const entregas = alumno.estado === 'autorizado'
      ? await ActividadAlumno.findAll({
        where: { id_alumno: id },
        include: [{ model: ActividadAdmin, as: 'actividad_info' }]
      })
      : [];
    alumno.setDataValue('entregas', entregas);

    res.json({ ok: true, data: alumno });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Busca en la base de datos la clave del recibo y transmite el PDF desde MinIO al cliente.
const obtenerRecibo = async (req, res) => {
  let alumno;
  try {
    // Solo se cargan los campos requeridos para localizar el objeto y nombrar la descarga.
    alumno = await Alumno.findByPk(req.params.id, {
      attributes: ['id_alumno', 'pdf_registro_key']
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }

  if (!alumno) {
    return res.status(404).json({ ok: false, message: 'Alumno no encontrado' });
  }

  const objectKey = alumno.pdf_registro_key;
  if (!objectKey) {
    return res.status(404).json({
      ok: false,
      message: 'El alumno no tiene un recibo asociado'
    });
  }

  // Acepta únicamente claves generadas para recibos de inscripción, no referencias arbitrarias.
  if (!objectKey.startsWith('alumnos/inscripciones/') || !objectKey.endsWith('.pdf')) {
    return res.status(404).json({
      ok: false,
      message: 'La referencia del recibo no es válida'
    });
  }

  let object;
  try {
    object = await downloadPdf(objectKey);
  } catch (error) {
    // Un objeto borrado o inexistente se reporta como 404; otros fallos indican error de MinIO.
    if (error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404) {
      return res.status(404).json({
        ok: false,
        message: 'No se encontró el recibo en MinIO'
      });
    }

    return res.status(502).json({
      ok: false,
      error: `No se pudo recuperar el recibo de MinIO: ${error.message}`
    });
  }

  if (!object.Body) {
    return res.status(502).json({
      ok: false,
      error: 'MinIO devolvió el recibo sin contenido'
    });
  }

  // Indica que el cuerpo es un PDF para mostrarlo en línea y evita guardarlo en caché.
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `inline; filename="recibo-${alumno.id_alumno}.pdf"`,
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff'
  });

  try {
    // Transfiere el contenido como flujo para no cargar el PDF completo otra vez en memoria.
    await pipeline(object.Body, res);
  } catch (error) {
    console.error('No se pudo transmitir el recibo desde MinIO:', error);
    if (!res.destroyed) {
      res.destroy(error);
    }
  }
};

// Actualiza el estado del alumno y registra la fecha cuando se marca como liberado.
const cambiarEstadoAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // 'no autorizado', 'autorizado', 'liberado'

    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
      return res.status(404).json({ ok: false, message: 'Alumno no encontrado' });
    }

    // PostgreSQL puede ejecutar el trigger configurado cuando el estado pasa a autorizado.
    alumno.estado = estado;
    if (estado === 'liberado') {
      alumno.fecha_liberacion = new Date();
    }
    await alumno.save();

    // Elimina la contraseña antes de incluir el alumno actualizado en la respuesta.
    const alumnoActualizado = alumno.toJSON();
    delete alumnoActualizado.contraseña;

    res.json({ ok: true, message: `Estado actualizado a '${estado}'`, data: alumnoActualizado });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// Expone los controladores y middlewares utilizados por alumno.routes.js.
module.exports = {
  cargarRecibo,
  soloVistaLocalDeRecibos,
  subirRecibo,
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  obtenerRecibo,
  cambiarEstadoAlumno
};