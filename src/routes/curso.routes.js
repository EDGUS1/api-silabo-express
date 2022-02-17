const express = require('express');
const controller = require('../controllers/curso');
const router = express.Router();

router.get('/', controller.listar);
router.post('/', controller.save);
router.delete('/', controller.delete);

module.exports = router;
