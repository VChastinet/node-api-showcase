const artistService = require('../services/artistService');
const statusCodeEnum = require('../shared/enum/status-code-enum');
const jwt = require('jsonwebtoken');
const Artist = require('../shared/model/Artist');

exports.getAll = (req, res, next) => {
    artistService
        .getAll()
        .then(data => manageGet(data, res))
        .catch(error => manageError(error, res));
};

exports.getByUf = (req, res, next) => {
    const idUf = req.params.idUf;
    artistService
        .getByUf(idUf)
        .then(data => manageGet(data, res))
        .catch(error => manageError(error, res));
};

exports.getByTag = (req, res, next) => {
    const tags = req.params.tags;
    artistService
        .getByTag(tags)
        .then(data => manageGet(data, res))
        .catch(error => manageError(error, res));
};

exports.getByName = (req, res, next) => {
    const name = req.params.name;
    artistService
        .getByName(name)
        .then(data => manageGet(data, res))
        .catch(error => manageError(error, res));
};

exports.post = (req, res, next) => {
    const artist = new Artist(req.body);
    artistService
        .newArtist(artist)
        .then(() => {
            jwt.verify(req.token, 'secretKey', error => {
                if (error) {
                    res.status(statusCodeEnum.UNAUTHOURIZED).send({ validToken: 'false' });
                    return;
                }
                res.status(statusCodeEnum.CREATED).send('New artist saved');
            });
        })
        .catch(error => manageError(error, res));
};

exports.put = (req, res, next) => {
    const artistId = req.params.artistId;
    const artist = new Artist(req.body);
    artistService
        .put(artist, artistId)
        .then(() => {
            jwt.verify(req.token, 'secretKey', error => {
                if (error) {
                    res.status(statusCodeEnum.UNAUTHOURIZED).send({ validToken: 'false' });
                    return;
                }
                res.status(statusCodeEnum.ACCEPTED).send('Artist updated');
            });
        })
        .catch(error => manageError(error, res));
};

function manageGet(data, res) {
    if (!data.rowCount) {
        res.status(statusCodeEnum.NO_CONTENT);
        return;
    }
    
    res.status(statusCodeEnum.OK).send(data.rowCount > 1 ? data.rows : data.rows[0]);
}

function manageError(error, res) {
    res.status(statusCodeEnum.SERVER_ERROR).send({ message: 'Internal Error', error: error.stack });
    console.error(error.stack);
}
