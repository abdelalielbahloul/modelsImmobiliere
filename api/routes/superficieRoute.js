const express = require('express');
const router = express.Router();
const superficieController = require('../controllers/superficieController');

router.get('/', superficieController.index);
router.post('/', superficieController.create);
router.get('/:id', superficieController.show);
router.put('/:id', superficieController.update);
router.patch('/:id', superficieController.edit);
router.delete('/:id', superficieController.delete);

module.exports = router;