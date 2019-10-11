
export default class CodePackage {
    /**
     * 
     * @param {string} id 
     * @param {string} version 
     * @param {Object} body 
     */
    constructor(id, version, body) {
        this.id = id;
        this.version = version;
        this.body = body;
    }
};