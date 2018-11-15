const express = require('express');
const controller = require('../controllers/ufController');
const verifyToken = require ('../shared/util/verify-token');

const router = express.Router();

router.get('/:idUf', verifyToken, controller.getOne);
router.get('/', verifyToken, controller.getAll);

module.exports = router;
