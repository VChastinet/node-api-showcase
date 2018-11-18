const dbClient = require('../../bin/dataBase');

function login(email) {
    return dbClient.query(
        'SELECT * FROM users WHERE email = $1;',
        [email]
    );
};

function newUser({email, name, password}) {
    return dbClient.query(
        'INSERT INTO users (email, name, password) VALUES ($1, $2, $3);',
        [email, name, password]
    );
};

module.exports = {
    login,
    newUser
};