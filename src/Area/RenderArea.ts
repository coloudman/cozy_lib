
import { Compiler } from "cozy_lib";
import CodeArea from "./CodeArea";

export default abstract class RenderArea {
    readonly compilers : Compiler[]
    readonly codeArea : CodeArea

    constructor(compilers : Compiler[], codeArea : CodeArea) {
        this.compilers = compilers;
        this.codeArea = codeArea;
    }

    abstract render():
}