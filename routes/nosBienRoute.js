const express = require('express');
const router = express.Router();
const nosBienController = require('../controllers/nosBienController');

router.get('/', nosBienController.index);
module.exports = router;