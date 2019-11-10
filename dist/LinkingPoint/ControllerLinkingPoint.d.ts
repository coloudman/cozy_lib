import LinkingPoint from "./LinkingPoint";
import Controller from "../Element/Controller";
declare class ControllerLinkingPoint extends LinkingPoint<Controller, Controller> {
    constructor();
    loadData(controller: Controller): Controller;
}
export default ControllerLinkingPoint;
