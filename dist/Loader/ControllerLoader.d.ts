import Loader from "./ElementLoader";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";
import ControllerInfo from "../structClass/ControllerInfo";
export default class ControllerLoader extends Loader<ControllerPackage> {
    load({ code, iD, data, context, linkingPointsManager }: ControllerInfo): Controller;
}
