import Code from "./Code";

import LinkedControllers from "@src/structClass/LinkedControllers";

export default abstract class Controller {
    code: Code
    linkedControllers: LinkedControllers<Controller>

    constructor(code : Code, linkedControllers : LinkedControllers<Controller>) {

        this.code = code;
        this.linkedControllers = linkedControllers;

        this.init();
    }

    abstract init():any
};