
import Compiler from "../element/Compiler";
import CodeArea from "./CodeArea";

export default abstract class CompilerArea {
    readonly compilers : Compiler[]
    readonly codeArea : CodeArea

    constructor(compilers : Compiler[], codeArea : CodeArea) {
        this.compilers = compilers;
        this.codeArea = codeArea;
    }

    abstract compile()
}