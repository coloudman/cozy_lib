import Code from "./Code";
import ControllerData from "@src/struct/ControllerData";
import Element from "./Element";

import LinkingPointsData from "@src/struct/LinkingPointsData";
import LinkedControllers from "@src/structClass/LinkedControllers";

export default abstract class Controller<DataT extends ControllerData, ElementT extends Element<DataT, ElementT>> extends Element<DataT, ElementT>{
    code: Code
    linkedControllers: LinkedControllers<Controller<DataT, ElementT>>

    constructor(data : object, code : Code, linkedControllers : LinkedControllers<Controller<DataT, ElementT>>) {
        super(data);
        this.code = code;
        this.linkedControllers = linkedControllers;

        this.init();
    }

    abstract init():any
};