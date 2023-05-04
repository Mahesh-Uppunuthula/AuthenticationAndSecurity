const express = require('express');
const router = express.Router();

const secretController = require('../controllers/secretsController');

router.route('/')
    .get(secretController.renderSecretsPage);

console.log("secrets route");

module.exports = router;