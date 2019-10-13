import Element from "./Element";
import CodeData from "../struct/CodeData";
import LinkingPoints from "../structClass/LinkingPoints";
import Mix from "../Mix/Mix";
/**
 * Load Code from codeData object(json)
 * @function loadCode
 * @param {Object} codeData
 * @return {Code}
*/
export default abstract class Code extends Element<CodeData, Code> {
    linkingPoints: LinkingPoints;
    readonly addLinkingPoint: (name: string) => Mix;
    constructor(data: object, mix: Mix);
    abstract init(): any;
}
