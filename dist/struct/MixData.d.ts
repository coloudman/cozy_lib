import CodeData from "./CodeData";
import ControllerData from "./ControllerData";
import LinkingPointsData from "./LinkingPointsData";
export default interface MixData {
    codeData: CodeData;
    controllerDatas: {
        [name: string]: ControllerData;
    };
    linkingPointsData: LinkingPointsData;
}
