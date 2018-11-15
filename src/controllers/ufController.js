const ufService = require('../services/ufService');
const statusCodeEnum = require('../shared/enum/status-code-enum');
const jwt = require('jsonwebtoken');
const Uf = require('../shared/model/uf');

exports.getAll = (req, res, next) => {
    ufService
        .getAll()
        .then(data => verify(req, res, data, manageGet))
        .catch(error => manageError(error, res));
};

exports.getOne = (req, res, next) => {
    const idUf = req.params.idUf;
    ufService
        .getOne(idUf)
        .then(data => verify(req, res, data, manageGet))
        .catch(error => manageError(error, res));
};

function manageGet(data, res) {
    if (!data.rowCount) {
        res.status(statusCodeEnum.NO_CONTENT);
        return;
    }
    const mensagens = data.rows.map(row => {
        return new Uf(row);
    });
    res.status(statusCodeEnum.OK).send(data.rowCount > 1 ? mensagens : mensagens[0]);
}

function manageError(error, res) {
    res.status(statusCodeEnum.SERVER_ERROR).send({ message: 'Ocorreu um interno', error: error.stack });
    console.error(error.stack);
}

function verify(req, res, data, manageGet) {
    jwt.verify(req.token, 'secretKey', error => {
        if (error) {
            res.status(statusCodeEnum.UNAUTHOURIZED).send({ validToken: 'false' });
            return;
        }
        manageGet(data, res);
    });
}
