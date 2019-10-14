
import Controller from "./Controller";

export default abstract class Renderer extends Controller {
    abstract compile(): any
};