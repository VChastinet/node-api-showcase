
const dbClient = require('../../bin/dataBase');

function getAll() {
    return dbClient.query('SELECT * FROM estado;');
};


function getOne(idUf) {
    return dbClient.query(
        'SELECT * FROM estado WHERE id = $1;',
        [idUf]
    );
};

module.exports = {getAll, getOne}