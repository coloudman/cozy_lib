import LinkingPointsManager from "./LinkingPointsManager";

import Controller from "../Element/Controller";
import ControllerInfo from "../structClass/ControllerInfo";
import ControllerLinkingPoint from "./ControllerLinkingPoint";
import ControllerLoader from "../Loader/ControllerLoader";

/*
CodeData를 받아 생성자에서 넣어놓은 CodeLoader를 통해 CodeData를 로드하고 LinkingPointsManager<Code>에 저장합니다.
*/
class ControllerLinkingPointsManager extends LinkingPointsManager<Controller, Controller>{
    constructor() {
        super();
    }
    createLinkingPoint() {
        return new ControllerLinkingPoint();
    }
}

export default ControllerLinkingPointsManager