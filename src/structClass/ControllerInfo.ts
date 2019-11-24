import Code from "../Element/Code";
import ID from "../struct/ID";
import Context from "../element/Context";
import Data from "../struct/Data";
import LinkingPointsManager from "../LinkingPoint/LinkingPointsManager";
import Controller from "../Element/Controller";
import ControllerLinkingPointsManager from "../LinkingPoint/ControllerLinkingPointsManager";


export default interface ControllerInfo {
    code: Code
    iD: ID
    data: Data
    context: Context
    linkingPointsManager: ControllerLinkingPointsManager
}