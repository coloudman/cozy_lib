import LinkingPointsData from "./LinkingPointsData";
import Data from "./Data";
import ID from "./ID";
export default interface CodeData {
    iD: ID;
    data: object;
    linkingPointsData: LinkingPointsData;
    controllerDatas: {
        [controllerName: string]: Data;
    };
}
