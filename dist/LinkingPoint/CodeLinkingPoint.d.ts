import LinkingPoint from "./LinkingPoint";
import Code from "../Element/Code";
import CodeData from "../struct/CodeData";
import CodeLoader from "../Loader/CodeLoader";
declare class CodeLinkingPoint extends LinkingPoint<CodeData, Code> {
    codeLoader: CodeLoader;
    constructor(codeLoader: CodeLoader);
    loadData(codeData: CodeData): Code;
}
export default CodeLinkingPoint;
