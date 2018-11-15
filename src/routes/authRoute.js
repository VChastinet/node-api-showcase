const express = require('express');
const controller = require('../controllers/authController');
const verifyToken = require ('../shared/util/verify-token');

const router = express.Router();

router.post('/', controller.post);
router.get('/verify', verifyToken, controller.get);

module.exports = router;
