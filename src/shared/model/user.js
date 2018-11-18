class User {

    /**
     * @param {*} id
     * @param {*} name
     * @param {*} email
     * @memberof Uf
     */
    constructor({id, name, email}) {
        this.id = id;
        this.nome = name;
        this.cargo = email;
    }
}

module.exports = User;