
import Loader from "./ElementLoader";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";

import ControllerInfo from "../structClass/ControllerInfo";

export default class ControllerLoader extends Loader<ControllerPackage> {
    load({code, iD, data, context, linkingPointsManager} : ControllerInfo) : Controller {
        
        const foundPackage = Object.values(this.packages).find((package_ : ControllerPackage) => {
            return iD.packageId === package_.for_id && iD.packageVersion === package_.for_version;
        });

        const Class = foundPackage.body[iD.id];

        const instance = new Class(code, data, context, linkingPointsManager);
        return instance;
    }
}