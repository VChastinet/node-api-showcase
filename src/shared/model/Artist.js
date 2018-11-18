class Artist {
    /**
     * @param {*} name
     * @param {*} instagram_url
     * @param {*} estado
     * @param {*} instagram_username
     * @param {*} url
     * @param {*} tags
     */
    constructor({name, instagram_url, instagram_username, estado, url, tags}) {
        this._name = name;
        this._instagram_url = instagram_url;
        this._instagram_username = instagram_username;
        this._estado = estado;
        this._url = url || null;
        this._tags = tags || null;
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
    get name() {
        return this._name;
    }

    /**
     * @return {string}
     * @readonly
     */
    get instagram_url() {
        return this._instagram_url;
    }

    /**
     * @return {boolean}
     * @readonly
     */
    get url() {
        return this._url;
    }

    /**
     * @return {string}
     * @readonly
     */
    get instagram_username() {
        return this._instagram_username;
    }

    /**
     * @return {string}
     * @readonly
     */
    get estado() {
        return this._estado;
    }

    /**
     * @return {string}
     * @readonly
     */
    get url() {
        return this._url;
    }

    /**
     * @return {string}
     * @readonly
     */
    get tags() {
        return this._tags;
    }
}

module.exports = Artist;
