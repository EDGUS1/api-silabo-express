const express = require('express');
const controller = require('../controllers/competencia');
const router = express.Router();

router.get('/especifica/:id', controller.especifica);
router.get('/general/:id', controller.general);

module.exports = router;
