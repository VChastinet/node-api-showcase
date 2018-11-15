const dbClient = require('../../bin/dataBase');

function getAll() {
    return dbClient.query('SELECT nu_seq_mensagem_aviso, ds_titulo, ds_mensagem FROM sigfacil.s_mensagem_aviso limit 100');
};

function getAllByUf(uf) {
    return dbClient.query(
        'SELECT nu_seq_mensagem_aviso, ds_titulo, ds_mensagem FROM sigfacil.s_mensagem_aviso WHERE nu_seq_uf=$1',
        [uf]
    );
};

function getByUf(uf) {
    return dbClient.query(
        'SELECT nu_seq_mensagem_aviso, ds_titulo, ds_mensagem FROM sigfacil.s_mensagem_aviso WHERE nu_seq_uf=$1 AND is_ativo = true',
        [uf]
    );
};

function updateMessage(mensagem, uf) {
    return dbClient.query(
        'UPDATE sigfacil.s_mensagem_aviso SET (ds_titulo, ds_mensagem) = ($1, $2) WHERE nu_seq_uf=$3;',
        [mensagem.titulo, mensagem.corpo, uf]
    );
};

function newMessage(mensagem) {
    return dbClient.query(
        'INSERT INTO sigfacil.s_mensagem_aviso (nu_seq_uf, ds_titulo, ds_mensagem) VALUES ($1, $2, $3);',
        [mensagem.uf, mensagem.titulo, mensagem.corpo]
    );
}

module.exports = { getAll, getAllByUf, getByUf, updateMessage, newMessage }
