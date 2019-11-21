import LinkingPoint from "./LinkingPoint";
import Code from "../Element/Code";
import CodeData from "../struct/CodeData";
import CodeLoader from "../Loader/CodeLoader";
import Contexts from "../structClass/Contexts";


class CodeLinkingPoint extends LinkingPoint<CodeData, Code> {
    codeLoader: CodeLoader;
    contexts: any;
    constructor(codeLoader : CodeLoader, contexts : Contexts) {
        super();
        this.codeLoader = codeLoader;
        this.contexts = contexts;
    }
    loadData(codeData : CodeData) {
        return this.codeLoader.load(codeData, this.contexts);
    } 
}

export default CodeLinkingPoint;