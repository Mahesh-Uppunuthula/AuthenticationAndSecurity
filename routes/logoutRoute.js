const express = require('express');
const router = express.Router();

const logoutController = require('../controllers/logoutController');

router.get('/', logoutController.logTheUserOut);

module.exports = router;
