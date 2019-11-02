import Code from "./Code";

import LinkedControllers from "@src/structClass/LinkedControllers";
import Data from "@src/struct/Data";
import Context from "@src/structClass/Context";

export default abstract class Controller {
    code: Code
    linkedControllers: LinkedControllers
    data: Data
    context: Context

    constructor(code : Code, linkedControllers : LinkedControllers, data:Data, context:Context) {

        this.code = code;
        this.linkedControllers = linkedControllers;
        this.data = data;
        this.context = context;

        this.init();
    }

    abstract init():any
    abstract stop():any
};