const express = require('express');
const controller = require('../controllers/login');
const router = express.Router();

router.get('/listar', controller.listar);
router.post('/', controller.login);
router.post('/register', controller.register);
router.delete('/', controller.delete);
router.put('/', controller.update);

module.exports = router;
