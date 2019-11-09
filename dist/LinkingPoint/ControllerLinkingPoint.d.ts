import LinkingPoint from "./LinkingPoint";
import Controller from "@src/Element/Controller";
declare class ControllerLinkingPoint extends LinkingPoint<Controller, Controller> {
    constructor();
    loadData(controller: Controller): Controller;
}
export default ControllerLinkingPoint;
