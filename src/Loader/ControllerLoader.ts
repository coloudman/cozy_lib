
import Loader from "./Loader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";

import ControllerData from "@src/struct/ControllerData";
import LinkingPoint from "@src/structClass/LinkingPoint";

export default class ControllerLoader<T extends Controller<any, any>> extends Loader<ControllerPackage<T>> {
    load(data : ControllerData, code : Code) : T {
        
        const foundPackage = Object.values(this.packages).find((package_ : ControllerPackage<T>) => {
            return data.packageId === package_.id && data.packageVersion === package_.version;
        });

        const Class = foundPackage.body[data.id];

        const instance = new Class(data.data, code);
        return instance;
    }
}