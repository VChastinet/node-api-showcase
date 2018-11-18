const dbClient = require('../../bin/dataBase');

function getAll() {
    return dbClient.query('SELECT a.*, uf.nome AS nome_estado, uf.uf AS sigla FROM artist AS a INNER JOIN estado AS uf ON uf.id = a.estado');
};

function getByUf(uf) {
    return dbClient.query(
        'SELECT a.*, uf.nome AS nome_estado, uf.uf AS sigla FROM artist AS a INNER JOIN estado AS uf ON uf.id = a.estado WHERE estado = $1;',
        [uf]
    );
};

function getByTag(tag) {
    return dbClient.query(
        `SELECT a.*, uf.nome AS nome_estado, uf.uf AS sigla FROM artist AS a INNER JOIN estado AS uf ON uf.id = a.estado WHERE LOWER(tags) LIKE LOWER('%${tag}%');`
    );
};

function getByName(name) {
    return dbClient.query(
        `SELECT a.*, uf.nome AS nome_estado, uf.uf AS sigla FROM artist AS a INNER JOIN estado AS uf ON uf.id = a.estado WHERE LOWER(name) LIKE LOWER('%${name}%');`
    );
};

function put({name, instagram_url, instagram_username, url, tags, estado}, id) {
    return dbClient.query(
        'UPDATE artist SET (name, instagram_url, instagram_username, url, tags, estado) = ($1, $2, $3, $4, $5, $6) WHERE id = $7;',
        [name, instagram_url, instagram_username, url, tags, estado, id]
    );
};

function newMessage(name, instagram_url, instagram_username, url, tags, estado) {
    return dbClient.query(
        'INSERT INTO artist (name, instagram_url, instagram_username, url, tags, estado) VALUES ($1, $2, $3, $4, $5, $6);',
        [name, instagram_url, instagram_username, url, tags, estado]
    );
}

module.exports = { getAll, getByTag, getByUf, getByName, put, newMessage }
