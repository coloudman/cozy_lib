import Code from "./Code";
import ControllerData from "@src/struct/ControllerData";
import Element from "./Element";
export default abstract class Controller<DataT extends ControllerData, ElementT extends Element<DataT, ElementT>> extends Element<DataT, ElementT> {
    protected code: Code;
    constructor(data: object, code: Code);
    abstract init(): any;
}
