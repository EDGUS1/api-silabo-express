const express = require('express');
const controller = require('../controllers/curso');
const router = express.Router();

router.get('/', controller.listar);

module.exports = router;
