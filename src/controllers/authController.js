const authService = require('../services/authService');
const statusCodeEnum = require('../shared/enum/status-code-enum');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const User = require('../shared/model/user');

exports.login = (req, res, next) => {
    const credentials = req.body;
    
    authService.login(credentials.email)
        .then((userData) => {

            if (!userData.rowCount) {
                res.status(statusCodeEnum.UNAUTHOURIZED).send('user not found');
                return;
            }
            
            return bcrypt.compare(credentials.password, userData.rows[0].password, (error, response) => {
                if(error) {
                    manageError(error, res);
                }

                if (!response) {
                    res.status(statusCodeEnum.UNAUTHOURIZED).send('invalid password');
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

exports.newUser = (req, res, next) => {
    const newUser = req.body;
    bcrypt.hash(newUser.password, 12)
        .then(hash => {
            newUser.password = hash;
            return authService.newUser(newUser);
        })
        .then(() => 
            jwt.verify(req.token, 'secretKey', error => {
                if (error) {
                    res.status(statusCodeEnum.UNAUTHOURIZED).send({ validToken: 'false' });
                    return;
                }
                res.status(statusCodeEnum.CREATED).send('New user created');
            })
        )
        .catch(error => manageError(error, res));
}

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
    res.status(statusCodeEnum.SERVER_ERROR).send({message: 'internal error', error: error.stack});
    console.error(error.stack);
}