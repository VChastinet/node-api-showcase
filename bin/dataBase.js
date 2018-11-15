const pg = require('pg');

const connection = {
    host: '127.0.0.1', 
    port: 5432,
    database: 'maindb',
    user: 'vchastinet',
    password: '123'
}
const client = new pg.Client(connection);

function dbConnectionMessage(erro) {
    return erro ? `Ocorreu um erro na conexão com o banco: ${erro}` : 'conectado ao banco de dados';
}

client.connect((erro) => console.log(dbConnectionMessage(erro)));

module.exports = client;
