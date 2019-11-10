import LinkingPointsManager from "./LinkingPointsManager";
import Code from "../Element/Code";
import CodeLoader from "../Loader/CodeLoader";
import CodeData from "../struct/CodeData";
import CodeLinkingPoint from "./CodeLinkingPoint";
declare class CodeLinkingPointsManager extends LinkingPointsManager<CodeData, Code> {
    codeLoader: CodeLoader;
    constructor(codeLoader: CodeLoader);
    createLinkingPoint(): CodeLinkingPoint;
}
export default CodeLinkingPointsManager;
