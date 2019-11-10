import LinkingPoint from "./LinkingPoint";
import ControllerInfo from "../structClass/ControllerInfo";
import ControllerLoader from "../Loader/ControllerLoader";
import Controller from "../Element/Controller";


class ControllerLinkingPoint extends LinkingPoint<Controller, Controller> {
    constructor() {
        super();
    }
    loadData(controller : Controller) {
        return controller
    } 
}

export default ControllerLinkingPoint;