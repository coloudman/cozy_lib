import LinkingPoint from "./LinkingPoint";
import CodeData from "@src/struct/CodeData";
/**
 * Load Code from codeData object(json)
 * @function loadCode
 * @param {Object} codeData
 * @return {Code}
*/
export default abstract class Code {
    loadCode: (codeData: CodeData) => Code;
    data: object;
    linkingPoints: {
        [name: string]: LinkingPoint;
    };
    abstract init(): any;
    constructor(data: object, loadCode: (codeData: CodeData) => Code);
    addLinkingPoint(name: string): LinkingPoint;
    link(name: string, code: Code): void;
    unlink(name: string): void;
}
