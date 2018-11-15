const authService = require('../services/authService');
const statusCodeEnum = require('../shared/enum/status-code-enum');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const User = require('../shared/model/user');

exports.post = (req, res, next) => {
    const credentials = req.body;
    
    authService(credentials.login)
        .then((userData) => {

            if (!userData.rowCount) {
                res.status(statusCodeEnum.UNAUTHOURIZED).send('Usuário inválido');
                return;
            }

            bcrypt.compare(credentials.senha, userData.rows[0].ds_senha, (err, response) => {
                if (err) {
                    manageError(err, res);
                    return;
                }

                if (!response) {
                    res.status(statusCodeEnum.UNAUTHOURIZED).send('Senha inválida');
                    return;
                }
                const user = new User(userData.rows[0]);
                jwt.sign({user: user}, 'secretKey', { expiresIn: '1h' }, (err, token) => {
                    if (!!err) {
                        manageError(err, res)
                        return;
                    }
                    res.send({ token, user });
                });
            });
        })
        .catch(error => manageError(error, res));
};

exports.get = (req, res, next) => {
    jwt.verify(req.token, 'secretKey', (error, authData) => {
        if (error) {
            res.status(statusCodeEnum.UNAUTHOURIZED).json({validToken: 'false'});
            return;
        }
        res.json({validToken: 'true'});
    });
}
 
function manageError(error, res) {
    res.status(statusCodeEnum.SERVER_ERROR).send({message: 'Ocorreu um interno', error: error.stack});
    console.error(error.stack);
}