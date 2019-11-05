import Loader from "./ElementLoader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";
import Context from "@src/structClass/Context";
import Data from "@src/struct/Data";
import LinkingPointsManager from "@src/LinkingPoint/LinkingPointsManager";
import ID from "@src/struct/ID";
export default class ControllerLoader<T extends Controller> extends Loader<ControllerPackage<T>> {
    load(code: Code, iD: ID, data: Data, context: Context, linkingPointsManager: LinkingPointsManager<T>): T;
}
