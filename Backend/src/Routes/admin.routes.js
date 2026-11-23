const { Router } = require('express');
const router = Router();
const { crearAdmin, obtenerAdmins } = require('../Controllers/admin.controller');

router.post('/', crearAdmin);
router.get('/', obtenerAdmins);

module.exports = router;