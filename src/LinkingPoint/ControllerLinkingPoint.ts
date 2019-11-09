import LinkingPoint from "./LinkingPoint";
import ControllerInfo from "@src/structClass/ControllerInfo";
import ControllerLoader from "@src/Loader/ControllerLoader";
import Controller from "@src/Element/Controller";


class ControllerLinkingPoint extends LinkingPoint<Controller, Controller> {
    constructor() {
        super();
    }
    loadData(controller : Controller) {
        return controller
    } 
}

export default ControllerLinkingPoint;