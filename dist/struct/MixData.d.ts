import CodeData from "./CodeData";
import LinkingPointsData from "./LinkingPointsData";
import Data from "./Data";
export default interface MixData {
    codeData: CodeData;
    linkingPointsData: LinkingPointsData;
    controllerDatas: {
        [controllerName: string]: Data;
    };
}
