class User {

    /**
     * @param {*} nu_seq_usuario
     * @param {*} ds_nome
     * @param {*} ds_cargo
     * @param {*} ds_login
     * @param {*} dt_ultimo_acesso
     * @memberof Uf
     */
    constructor({nu_seq_usuario, ds_nome, ds_cargo, ds_login, dt_ultimo_acesso}) {
        this.id = nu_seq_usuario;
        this.nome = ds_nome;
        this.cargo = ds_cargo;
        this.login = ds_login;
        this.ultinoAcesso = dt_ultimo_acesso;
    }
}

module.exports = User;