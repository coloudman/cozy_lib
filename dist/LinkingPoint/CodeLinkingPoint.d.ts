import LinkingPoint from "./LinkingPoint";
import Code from "@src/Element/Code";
import CodeData from "@src/struct/CodeData";
import CodeLoader from "@src/Loader/CodeLoader";
declare class CodeLinkingPoint extends LinkingPoint<CodeData, Code> {
    codeLoader: CodeLoader;
    constructor(codeLoader: CodeLoader);
    loadData(codeData: CodeData): Code;
}
export default CodeLinkingPoint;
