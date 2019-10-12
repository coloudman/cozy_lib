import CodeArea from "./CodeArea";
import Controller from "../Element/Controller";
import Loader from "../Loader/Loader";

export default abstract class ControllerArea<T extends Controller> {
    readonly controllers : T[]
    readonly codeArea : CodeArea

    constructor(codeArea : CodeArea, loader:Loader) {
        this.codeArea = codeArea;
    }
}