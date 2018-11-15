
const dbClient = require('../../bin/dataBase');

function getAll() {
    return dbClient.query('SELECT nu_seq_uf, ds_nome, ds_sigla FROM comum.s_uf WHERE is_integrado_sigfacil = true;');
};


function getOne(idUf) {
    return dbClient.query(
        'SELECT nu_seq_uf, ds_nome, ds_sigla FROM comum.s_uf WHERE nu_seq_uf = $1;',
        [idUf]
    );
};

module.exports = {getAll, getOne}