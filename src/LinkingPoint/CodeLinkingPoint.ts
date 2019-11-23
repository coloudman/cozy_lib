import LinkingPoint from "./LinkingPoint";
import Code from "../Element/Code";
import CodeData from "../struct/CodeData";
import CodeLoader from "../Loader/CodeLoader";
import Contexts from "../structClass/Contexts";


class CodeLinkingPoint extends LinkingPoint<Code> {
    codeLoader: CodeLoader;
    contexts: Contexts;
    constructor(codeLoader : CodeLoader, contexts : Contexts) {
        super();
        this.codeLoader = codeLoader;
        this.contexts = contexts;

        this.on("linked", code => {
            code.on("unlink", function unlinkListener() {
                this.unlink();
                code.removeListener("unlink", unlinkListener);
            });
        });
    }
    linkFromCodeData(codeData : CodeData) {
        return this.link(this.codeLoader.load(codeData, this.contexts));
    }
}

export default CodeLinkingPoint;