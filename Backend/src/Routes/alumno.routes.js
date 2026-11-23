const { Router } = require('express');
const router = Router();
const {
  cargarRecibo,
  soloVistaLocalDeRecibos,
  subirRecibo,
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  obtenerRecibo,
  cambiarEstadoAlumno
} = require('../Controllers/alumno.controller');

router.post('/recibo', cargarRecibo, subirRecibo);

router.post('/', crearAlumno);
router.get('/', obtenerAlumnos);
router.get('/:id/recibo', soloVistaLocalDeRecibos, obtenerRecibo);
router.get('/:id', obtenerAlumnoPorId);
router.patch('/:id/estado', cambiarEstadoAlumno); // Actualiza estado (dispara el trigger si pasa a autorizado)

module.exports = router;