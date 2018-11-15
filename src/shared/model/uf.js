sistemasUf = require('../enum/sistemas-uf');
class Uf {

    /**
     * @param {*} nu_seq_uf
     * @param {*} ds_nome
     * @param {*} ds_sigla
     * @memberof Uf
     */
    constructor({nu_seq_uf, ds_nome, ds_sigla}) {
        this.id = nu_seq_uf;
        this.nome = ds_nome;
        this.sigla = ds_sigla;
        this.sistema = sistemasUf[ds_sigla];
    }
}

module.exports = Uf;