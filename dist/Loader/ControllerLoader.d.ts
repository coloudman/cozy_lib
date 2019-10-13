import Loader from "./Loader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";
import ControllerData from "@src/struct/ControllerData";
import LinkedControllers from "@src/structClass/LinkedControllers";
export default class ControllerLoader<T extends Controller<any, any>> extends Loader<ControllerPackage<T>> {
    load(data: ControllerData, code: Code, linkedControllers: LinkedControllers<Controller<any, any>>): T;
}
