


import LinkingPoints from "../structClass/LinkingPoints";
import Mix from "../Mix/Mix";

/**
 * Load Code from codeData object(json)
 * @function loadCode
 * @param {Object} codeData
 * @return {Code}
*/

type Data = {
    [key:string]:any
};

export default abstract class Code {
    data: Data;
    linkingPoints: LinkingPoints
    readonly addLinkingPoint: (name : string) => Mix;
    readonly addDefaultLinkingPoints: (name : [string]) => void;

    constructor(data : Data, mix : Mix) {
        this.data = data;
        this.linkingPoints = mix.linkingPoints;
        this.addLinkingPoint = mix.addLinkingPoint.bind(mix);
        this.addDefaultLinkingPoints = mix.addDefaultLinkingPoints;
        
        this.init();
    }

    abstract init(): any
};