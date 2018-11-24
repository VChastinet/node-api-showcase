const artistService = require('../services/artistService');
const statusCodeEnum = require('../shared/enum/status-code-enum');
const jwt = require('jsonwebtoken');
const Artist = require('../shared/model/Artist');

exports.getAll = (req, res) => {
  artistService
    .getAll()
    .then(data => manageGet(data, res))
    .catch(error => manageError(error, res));
};

exports.getByUf = (req, res) => {
  const idUf = req.params.idUf;
  artistService
    .getByUf(idUf)
    .then(data => manageGet(data, res))
    .catch(error => manageError(error, res));
};

exports.getByTag = (req, res) => {
  const tags = req.params.tags.split(',');
  Promise.all(tags.map(tag => artistService.getByTag(tag))).then(
    queryResponse => {
      const result = queryResponse
        .map(data => data.rows)
        .reduce((acc, val) => acc.concat(val));
      const artistsId = result.map(artist => artist.id);
      const filteredResult = result
        .filter((artist, index) => artistsId.indexOf(artist.id) === index)
        .map(artist => new Artist(artist));
      res.status(statusCodeEnum.OK).send(filteredResult);
    }
  );
  return;
};

exports.getByName = (req, res) => {
  const name = req.params.name;
  artistService
    .getByName(name)
    .then(data => manageGet(data, res))
    .catch(error => manageError(error, res));
};

exports.post = (req, res) => {
  const artist = req.body;
  if (!!artist.tags) {
    artist.tags = artist.tag.toUppercase().replate(/\s+|_+/, '');
  }
  artistService
    .newArtist(artist)
    .then(() => {
      jwt.verify(req.token, 'secretKey', error => {
        if (error) {
          res
            .status(statusCodeEnum.UNAUTHOURIZED)
            .send({ validToken: 'false' });
          return;
        }
        res.status(statusCodeEnum.CREATED).send('New artist saved');
      });
    })
    .catch(error => manageError(error, res));
};

exports.put = (req, res) => {
  const artistId = req.params.artistId;
  const artist = req.body;
  if (!!artist.tags) {
    artist.tags = artist.tag.toUppercase().replate(/\s+|_+/, '');
  }
  artistService
    .put(artist, artistId)
    .then(() => {
      jwt.verify(req.token, 'secretKey', error => {
        if (error) {
          res
            .status(statusCodeEnum.UNAUTHOURIZED)
            .send({ validToken: 'false' });
          return;
        }
        res.status(statusCodeEnum.ACCEPTED).send('Artist updated');
      });
    })
    .catch(error => manageError(error, res));
};

function manageGet(data, res) {
  if (!data.rowCount) {
    res.status(statusCodeEnum.NO_CONTENT).send();
    return;
  }
  const artists = data.rows.map(artist => new Artist(artist));
  res.status(statusCodeEnum.OK).send(artists);
}

function manageError(error, res) {
  res
    .status(statusCodeEnum.SERVER_ERROR)
    .send({ message: 'Internal Error', error: error.stack });
  console.error(error.stack);
}

function getTagResults(params) {
  const promises = [];
  return new Promise(resolve => {
    for (const param of params) {
      promises.push(artistService.getByTag(param));
    }
    resolve(promises);
  });
  Promise.all(params.map(param => artistService.getByTag(param))).then(
    values => {
      console.log(values.rows); // [true, 3]
    }
  );
}
