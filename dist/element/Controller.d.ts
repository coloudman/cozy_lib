import Code from "./Code";
import LinkedControllers from "@src/structClass/LinkedControllers";
export default abstract class Controller {
    code: Code;
    linkedControllers: LinkedControllers<Controller>;
    constructor(code: Code, linkedControllers: LinkedControllers<Controller>);
    abstract init(): any;
}
