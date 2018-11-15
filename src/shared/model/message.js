class Message {
    /**
     * @param {*} titulo
     * @param {*} corpo
     * @param {*} isAtivo
     * @param {*} uf
     */
    constructor({titulo, corpo, uf, isAtivo}) {
        this._titulo = titulo;
        this._corpo = corpo;
        this._isAtivo = isAtivo || true;
        this._uf = uf;
    }

    /**
     * @return {number}
     * @readonly
     */
    get id() {
        return this._id;
    }

    /**
     * @return {string}
     * @readonly
     */
    get titulo() {
        return this._titulo;
    }

    /**
     * @return {string}
     * @readonly
     */
    get corpo() {
        return this._corpo;
    }

    /**
     * @return {boolean}
     * @readonly
     */
    get isAtivo() {
        return this._isAtivo;
    }

    /**
     * @return {string}
     * @readonly
     */
    get uf() {
        return this._uf;
    }
}

module.exports = Message;
