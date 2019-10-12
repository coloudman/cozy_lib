
import CodeLoader from "../Loader/CodeLoader";
import CompilerLoader from "../Loader/CompilerLoader";
import RendererLoader from "../Loader/RendererLoader";

import CodeData from "@src/struct/CodeData"
import RendererData from "@src/struct/RendererData"
import CompilerData from "@src/struct/CompilerData"

export default class Manager {
    codeLoader : CodeLoader
    compilerLoader : CompilerLoader
    rendererLoader : RendererLoader
    constructor(codeDatas : CodeData[], rendererDatas : RendererData[], compilerDatas : CompilerData[]) {
        this.codeLoader.
    }
}