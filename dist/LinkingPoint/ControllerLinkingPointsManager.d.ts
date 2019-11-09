import LinkingPointsManager from "./LinkingPointsManager";
import Controller from "@src/Element/Controller";
import ControllerLinkingPoint from "./ControllerLinkingPoint";
declare class ControllerLinkingPointsManager extends LinkingPointsManager<Controller, Controller> {
    constructor();
    createLinkingPoint(): ControllerLinkingPoint;
}
export default ControllerLinkingPointsManager;
