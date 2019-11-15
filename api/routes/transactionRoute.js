const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');


router.get('/', transactionController.index);
router.post('/', transactionController.create);
router.get('/:id', transactionController.show);
router.put('/:id', transactionController.update);
router.patch('/:id', transactionController.edit);
router.delete('/:id', transactionController.delete);

module.exports = router;