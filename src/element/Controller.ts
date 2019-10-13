import Code from "./Code";
import ControllerData from "@src/struct/ControllerData";
import Element from "./Element";

import LinkingPointsData from "@src/struct/LinkingPointsData";

export default abstract class Controller<DataT extends ControllerData, ElementT extends Element<DataT, ElementT>> extends Element<DataT, ElementT>{
    protected code: Code

    constructor(data : object, code : Code) {
        super(data);
        this.code = code;

        this.init();
    }

    abstract init():any
};