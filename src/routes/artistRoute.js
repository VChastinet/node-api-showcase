const express = require('express');
const controller = require('../controllers/artistController');
const verifyToken = require ('../shared/util/verify-token');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/state/:idUf', controller.getByUf);
router.get('/tags/:tags', controller.getByTag);
router.get('/name/:name', controller.getByName);
router.post('/', verifyToken, controller.post);
router.put('/:artistId', verifyToken, controller.put);

module.exports = router;
