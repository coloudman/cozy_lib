import LinkingPoint from "./LinkingPoint";
import Code from "../Element/Code";
import CodeData from "../struct/CodeData";
import CodeLoader from "../Loader/CodeLoader";


class CodeLinkingPoint extends LinkingPoint<CodeData, Code> {
    codeLoader: CodeLoader;
    constructor(codeLoader : CodeLoader) {
        super();
        this.codeLoader = codeLoader;
    }
    loadData(codeData : CodeData) {
        return this.codeLoader.load(codeData);
    } 
}

export default CodeLinkingPoint;