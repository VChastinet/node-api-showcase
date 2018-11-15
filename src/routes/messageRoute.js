const express = require('express');
const controller = require('../controllers/messageController');
const verifyToken = require ('../shared/util/verify-token');

const router = express.Router();

router.get('/:idUf/historico', verifyToken, controller.getAllByUf);
router.get('/:idUf', verifyToken, controller.getOne);
router.get('/', verifyToken, controller.getAll);
router.post('/', verifyToken, controller.post);
router.put('/:idUf', verifyToken, controller.put);

module.exports = router;
