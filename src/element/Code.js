export default class Code {
    /**
     * @param {Object} data
     * @param {loadCode} loadCode
     */
    constructor(data, loadCode) {
        this.data = data;
        this.loadCode = loadCode;

        this.linkingPoints = {};

        this.init();
    }

    addLinkingPointListener(name, listener) {
        this.linkingPoints.listener
    }

    /**
     * 
     * @param {string} name 
     * @param {Code} code
     */
    linkPoint(name, code) {
        this.linkPoints[name]
    }
    unlinkPoint(name) {

    }
};