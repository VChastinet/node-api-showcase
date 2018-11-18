const express = require('express');
const controller = require('../controllers/ufController');
const verifyToken = require ('../shared/util/verify-token');

const router = express.Router();

router.get('/:idUf', controller.getOne);
router.get('/', controller.getAll);

module.exports = router;
