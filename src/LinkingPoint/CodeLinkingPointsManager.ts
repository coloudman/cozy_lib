import LinkingPointsManager from "./LinkingPointsManager";
import Code from "../Element/Code";
import CodeLoader from "../Loader/CodeLoader";
import CodeData from "../struct/CodeData";
import CodeLinkingPoint from "./CodeLinkingPoint";
import Contexts from "../structClass/Contexts";

/*
CodeData를 받아 생성자에서 넣어놓은 CodeLoader를 통해 CodeData를 로드하고 LinkingPointsManager<Code>에 저장합니다.
*/
class CodeLinkingPointsManager extends LinkingPointsManager<Code>{
    codeLoader: CodeLoader;
    contexts: Contexts;
    constructor(codeLoader : CodeLoader, contexts : Contexts) {
        super();
        this.codeLoader = codeLoader;
        this.contexts = contexts;
    }
    createLinkingPoint() {
        return new CodeLinkingPoint(this.codeLoader, this.contexts);
    }
    linkFromCodeData(name : string, codeData : CodeData) {
        return (<CodeLinkingPoint> this.linkingPoints[name]).linkFromCodeData(codeData);
    }
}

export default CodeLinkingPointsManager