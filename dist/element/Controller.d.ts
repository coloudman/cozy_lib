import Code from "./Code";
import LinkedControllers from "@src/structClass/LinkedControllers";
export default abstract class Controller {
    code: Code;
    linkedControllers: LinkedControllers;
    constructor(code: Code, linkedControllers: LinkedControllers);
    abstract init(): any;
}
