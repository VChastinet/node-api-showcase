const pg = require('pg');
let connection;
try {
    connection = require ('../local-db-config');
} catch(error) {
    console.log('production enviroment');
    connection = process.env.DATABASE_URL;
}

const client = new pg.Client(connection);

function dbConnectionMessage(erro) {
    return erro ? `Error when connecting to database: ${erro}` : 'Connected to database';
}

client.connect((erro) => console.log(dbConnectionMessage(erro)));

module.exports = client;
