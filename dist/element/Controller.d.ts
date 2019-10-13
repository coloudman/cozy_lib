import Code from "./Code";
import ControllerData from "@src/struct/ControllerData";
import Element from "./Element";
import LinkedControllers from "@src/structClass/LinkedControllers";
export default abstract class Controller<DataT extends ControllerData, ElementT extends Element<DataT, ElementT>> extends Element<DataT, ElementT> {
    code: Code;
    linkedControllers: LinkedControllers<Controller<DataT, ElementT>>;
    constructor(data: object, code: Code, linkedControllers: LinkedControllers<Controller<DataT, ElementT>>);
    abstract init(): any;
}
