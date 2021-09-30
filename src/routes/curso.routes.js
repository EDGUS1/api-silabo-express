const express = require('express');
const controller = require('../controllers/curso');
const router = express.Router();

router.get('/', controller.listar);
router.post('/', controller.save);

module.exports = router;
