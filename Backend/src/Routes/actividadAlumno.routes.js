const { Router } = require('express');
const router = Router();
const {
  obtenerEntregasPorAlumno,
  entregarEvidencia,
  evaluarEntrega
} = require('../Controllers/actividadAlumno.controller');

router.get('/alumno/:id_alumno', obtenerEntregasPorAlumno);
router.put('/entregar/:id_evidencia', entregarEvidencia);
router.patch('/evaluar/:id_evidencia', evaluarEntrega);

module.exports = router;