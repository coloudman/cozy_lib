import LinkingPointsManager from "./LinkingPointsManager";
import Code from "@src/Element/Code";
import CodeLoader from "@src/Loader/CodeLoader";
import CodeData from "@src/struct/CodeData";
import CodeLinkingPoint from "./CodeLinkingPoint";

/*
CodeData를 받아 생성자에서 넣어놓은 CodeLoader를 통해 CodeData를 로드하고 LinkingPointsManager<Code>에 저장합니다.
*/
class CodeLinkingPointsManager extends LinkingPointsManager<CodeData, Code>{
    codeLoader: CodeLoader;
    constructor(codeLoader : CodeLoader) {
        super();
        this.codeLoader = codeLoader;
    }
    createLinkingPoint() {
        return new CodeLinkingPoint(this.codeLoader);
    }
}

export default CodeLinkingPointsManager