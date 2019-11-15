const express = require('express');
const router = express.Router();
const typeBienController = require('../controllers/typeBienController');


router.get('/', typeBienController.index);
router.post('/', typeBienController.create);
router.get('/:id', typeBienController.show);
router.put('/:id', typeBienController.update);
router.patch('/:id', typeBienController.edit);
router.delete('/:id', typeBienController.delete);

module.exports = router;