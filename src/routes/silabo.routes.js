const express = require('express');
const controller = require('../controllers/silabo');
const router = express.Router();

router.get('/:id', controller.allbyid);
router.get('/all', controller.all);
router.get('/', controller.save);
/* router.delete('/:id', controller.delete);
router.put('/', controller.update); */

module.exports = router;
