const express = require('express');
const controller = require('../controllers/login');
const router = express.Router();

router.get('/listar', controller.listar);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.delete('/delete/:id', controller.delete);
router.put('/update', controller.update);

module.exports = router;
