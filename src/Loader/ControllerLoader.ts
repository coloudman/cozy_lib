
import Loader from "./ElementLoader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";

import Context from "@src/structClass/Context";
import Data from "@src/struct/Data";
import LinkingPointsManager from "@src/LinkingPoint/LinkingPointsManager";
import ID from "@src/struct/ID";

export default class ControllerLoader<T extends Controller> extends Loader<ControllerPackage<T>> {
    load(code : Code, iD:ID, data : Data, context : Context, linkingPointsManager : LinkingPointsManager<T>) : T {
        
        const foundPackage = Object.values(this.packages).find((package_ : ControllerPackage<T>) => {
            return iD.packageId === package_.for_id && iD.packageVersion === package_.for_version;
        });

        const Class = foundPackage.body[iD.id];

        const instance = new Class(code, data, context, linkingPointsManager);
        return instance;
    }
}