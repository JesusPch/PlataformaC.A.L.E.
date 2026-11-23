const { Router } = require('express');
const router = Router();
const { crearActividad, obtenerActividades } = require('../Controllers/actividadAdmin.controller');

router.post('/', crearActividad);
router.get('/', obtenerActividades);

module.exports = router;