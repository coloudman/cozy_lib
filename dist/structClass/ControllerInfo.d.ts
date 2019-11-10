import Code from "../Element/Code";
import ID from "../struct/ID";
import Context from "./Context";
import Data from "../struct/Data";
import ControllerLinkingPointsManager from "../LinkingPoint/ControllerLinkingPointsManager";
export default interface ControllerInfo {
    code: Code;
    iD: ID;
    data: Data;
    context: Context;
    linkingPointsManager: ControllerLinkingPointsManager;
}
