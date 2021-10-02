const express = require('express');
const controller = require('../controllers/hours');
const router = express.Router();

router.get('/', controller.listar);

module.exports = router;
