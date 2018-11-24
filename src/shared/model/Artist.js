class Artist {
    /**
     * @param {*} name
     * @param {*} instagram_url
     * @param {*} estado
     * @param {*} sigla
     * @param {*} instagram_username
     * @param {*} url
     * @param {*} tags
     */
    constructor({name, instagram_url, instagram_username, estado, sigla, url, tags}) {
        this.name = name;
        this.instagram_url = instagram_url;
        this.instagram_username = instagram_username;
        this.estado = estado;
        this.sigla = sigla;
        this.url = url || null;
        this.tags = tags ? tags.split(',') : [];
    }
}

module.exports = Artist;
