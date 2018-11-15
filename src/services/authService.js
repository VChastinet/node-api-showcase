const dbClient = require('../../bin/dataBase');
const loginQuery = `
SELECT p.ds_nome, u.nu_seq_usuario, u.ds_cargo, u.ds_login, u.dt_ultimo_acesso, u.ds_senha
    FROM autenticacao.s_usuario AS u
    INNER JOIN comum.s_pessoa_fisica AS pf ON pf.nu_seq_pessoa = u.nu_seq_pessoa_fisica
    INNER JOIN comum.s_pessoa AS p ON pf.nu_seq_pessoa = p.nu_seq_pessoa
    WHERE u.is_ativo = true AND u.ds_cargo = $1 AND u.ds_login = $2
`

function login(login) {
    return dbClient.query(
        loginQuery,
        ['ADMIN_SIGFACIL', login]
    );
};

module.exports = login;