import LinkingPointsManager from "./LinkingPointsManager";
import Code from "@src/Element/Code";
import CodeLoader from "@src/Loader/CodeLoader";
import CodeData from "@src/struct/CodeData";
import CodeLinkingPoint from "./CodeLinkingPoint";
declare class CodeLinkingPointsManager extends LinkingPointsManager<CodeData, Code> {
    codeLoader: CodeLoader;
    constructor(codeLoader: CodeLoader);
    createLinkingPoint(): CodeLinkingPoint;
}
export default CodeLinkingPointsManager;
