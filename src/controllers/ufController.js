const ufService = require('../services/ufService');
const statusCodeEnum = require('../shared/enum/status-code-enum');

exports.getAll = (req, res, next) => {
    ufService
        .getAll()
        .then(data => manageGet(data, res))
        .catch(error => manageError(error, res));
};

exports.getOne = (req, res, next) => {
    const idUf = req.params.idUf;
    ufService
        .getOne(idUf)
        .then(data => manageGet(data, res))
        .catch(error => manageError(error, res));
};

function manageGet(data, res) {
    if (!data.rowCount) {
        res.status(statusCodeEnum.NO_CONTENT).send();
        return;
    }
    
    res.status(statusCodeEnum.OK).send(data.rowCount > 1 ? data.rows : data.rows[0]);
}

function manageError(error, res) {
    res.status(statusCodeEnum.SERVER_ERROR).send({ message: 'Ocorreu um interno', error: error.stack });
    console.error(error.stack);
}
