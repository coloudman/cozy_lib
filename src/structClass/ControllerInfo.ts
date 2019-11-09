import Code from "@src/Element/Code";
import ID from "@src/struct/ID";
import Context from "./Context";
import Data from "@src/struct/Data";
import LinkingPointsManager from "@src/LinkingPoint/LinkingPointsManager";
import Controller from "@src/Element/Controller";
import ControllerLinkingPointsManager from "@src/LinkingPoint/ControllerLinkingPointsManager";


export default interface ControllerInfo {
    code: Code
    iD: ID
    data: Data
    context: Context
    linkingPointsManager: ControllerLinkingPointsManager
}