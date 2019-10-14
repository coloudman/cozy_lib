import Controller from "./Controller";

export default abstract class Compiler extends Controller {
    abstract compile(): any
};