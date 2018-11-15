const messageService = require('../services/messageService');
const statusCodeEnum = require('../shared/enum/status-code-enum');
const jwt = require('jsonwebtoken');
const Mensagem = require('../shared/model/message');

exports.getAll = (req, res, next) => {
    messageService
        .getAll()
        .then(data => verify(req, res, data, manageGet))
        .catch(error => manageError(error, res));
};

exports.getAllByUf = (req, res, next) => {
    const idUf = req.params.idUf;
    messageService
        .getAllByUf(idUf)
        .then(data => verify(req, res, data, manageGet))
        .catch(error => manageError(error, res));
};

exports.getOne = (req, res, next) => {
    const idUf = req.params.idUf;
    messageService
        .getByUf(idUf)
        .then(data => verify(req, res, data, manageGet))
        .catch(error => manageError(error, res));
};

exports.post = (req, res, next) => {
    const mensagem = new Mensagem(req.body);
    messageService
        .newMessage(mensagem)
        .then(() => {
            jwt.verify(req.token, 'secretKey', error => {
                if (error) {
                    res.status(statusCodeEnum.UNAUTHOURIZED).send({ validToken: 'false' });
                    return;
                }
                res.status(statusCodeEnum.CREATED).send('Nova menssagem criada com sucesso');
            });
        })
        .catch(error => manageError(error, res));
};

exports.put = (req, res, next) => {
    const idUf = req.params.idUf;
    const mensagem = new Mensagem(req.body);
    messageService
        .updateMessage(mensagem, idUf)
        .then(() => {
            jwt.verify(req.token, 'secretKey', error => {
                if (error) {
                    res.status(statusCodeEnum.UNAUTHOURIZED).send({ validToken: 'false' });
                    return;
                }
                res.status(statusCodeEnum.ACCEPTED).send('Mensagem atualizada com sucesso');
            });
        })
        .catch(error => manageError(error, res));
};

function manageGet(data, res) {
    if (!data.rowCount) {
        res.status(statusCodeEnum.NO_CONTENT);
        return;
    }
    const mensagens = data.rows.map(row => {
        return {
            id: row.nu_seq_mensagem_aviso,
            titulo: row.ds_titulo,
            corpo: row.ds_mensagem
        };
    });
    res.status(statusCodeEnum.OK).send(data.rowCount > 1 ? mensagens : mensagens[0]);
}

function manageError(error, res) {
    res.status(statusCodeEnum.SERVER_ERROR).send({ message: 'Ocorreu um interno', error: error.stack });
    console.error(error.stack);
}

function verify(req, res, data, manager) {
    jwt.verify(req.token, 'secretKey', error => {
        if (error) {
            res.status(statusCodeEnum.UNAUTHOURIZED).send({ validToken: 'false' });
            return;
        }
        manager(data, res);
    });
}
