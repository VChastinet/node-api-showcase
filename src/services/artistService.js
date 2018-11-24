const dbClient = require('../../bin/dataBase');

function getAll() {
    return dbClient.query(
        `SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, a.tags, uf.nome AS estado, uf.uf AS sigla
         FROM artist AS a
            INNER JOIN estado AS uf ON uf.id = a.estado`
        );
};

function getByUf(uf) {
    return dbClient.query(
        `SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, a.tags, uf.nome AS estado, uf.uf AS sigla
         FROM artist AS a
            INNER JOIN estado AS uf ON uf.id = a.estado
            WHERE uf.id = $1;`,
        [uf]
    );
};

function getByTag(tag) {
    return dbClient.query(
        `SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, a.tags, uf.nome AS estado, uf.uf AS sigla
        FROM artist AS a
               INNER JOIN estado AS uf ON uf.id = a.estado
               WHERE LOWER(tags) LIKE LOWER('%${tag}%');`
    );
};

function getByName(name) {
    return dbClient.query(
        `SELECT a.id, a.name, a.instagram_username, a.instagram_url, a.url, a.tags, uf.nome AS estado, uf.uf AS sigla
        FROM artist AS a
               INNER JOIN estado AS uf ON uf.id = a.estado
               WHERE LOWER(a.name) LIKE LOWER('%${name}%');`
    );
};

function put({name, instagram_url, instagram_username, url, tags, estado}, id) {
    return dbClient.query(
        'UPDATE artist SET (name, instagram_url, instagram_username, url, tags, estado) = ($1, $2, $3, $4, $5, $6) WHERE id = $7;',
        [name, instagram_url, instagram_username, url, tags, estado, id]
    );
};

function newArtist(name, instagram_url, instagram_username, url, tags, estado) {
    return dbClient.query(
        'INSERT INTO artist (name, instagram_url, instagram_username, url, tags, estado) VALUES ($1, $2, $3, $4, $5, $6);',
        [name, instagram_url, instagram_username, url, tags, estado]
    );
}

module.exports = { getAll, getByTag, getByUf, getByName, put, newArtist }
