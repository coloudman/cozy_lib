import Loader from "./ElementLoader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";
import LinkedControllers from "@src/structClass/LinkedControllers";
import CodeData from "../struct/CodeData";
export default class ControllerLoader<T extends Controller> extends Loader<ControllerPackage<T>> {
    load(code: Code, codeData: CodeData, linkedControllers: LinkedControllers): T;
}
