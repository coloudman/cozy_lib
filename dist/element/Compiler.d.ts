import Controller from "./Controller";
import CompilerData from "@src/struct/CompilerData";
export default abstract class Compiler extends Controller<CompilerData, Compiler> {
    abstract compile(): any;
}
