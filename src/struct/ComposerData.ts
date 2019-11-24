import LinkingPointsData from "./LinkingPointsData";
import Data from "./Data";
import ID from "./ID";


export default interface ComposerData {
    iD:{
        packageId: string
        packageVersion: string
    }
    data:Data
}