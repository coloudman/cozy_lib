
import LinkingPoint from "./LinkingPoint";
import Data from "@src/struct/Data";

/**
 * Load Code from codeData object(json)
 * @function loadCode
 * @param {Object} codeData
 * @return {Code}
*/

export default abstract class Code {

    loadCode: (data : Data) => Code
    data: object

    linkingPoints: {
        [name : string]:LinkingPoint
    }

    
    abstract init(): any

    constructor(data : object, loadCode : (data : Data) => Code) {
        this.data = data;
        this.loadCode = loadCode;
        this.linkingPoints = {};

        this.init();
    }

    addLinkingPoint(name : string) {
        return this.linkingPoints[name] = new LinkingPoint();
    }

    link(name : string, code : Code) {
        this.linkingPoints[name].emit("link", code);
    }

    unlink(name : string) {
        this.linkingPoints[name].emit("unlink");
    }
};