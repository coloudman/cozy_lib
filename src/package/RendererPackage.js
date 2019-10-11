export default class RendererPackage {
    /**
     * 
     * @param {string} id 
     * @param {string} version 
     * @param {Object} body 
     * @param {string} for_ 
     */
    constructor(id, version, body, for_) {
        this.id = id;
        this.version = version;
        this.body = body;
        this.for = for_;
    }
}