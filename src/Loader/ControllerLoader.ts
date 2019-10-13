
import Loader from "./Loader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";

import ControllerData from "@src/struct/ControllerData";
import LinkingPoint from "@src/structClass/LinkingPoint";
import LinkedControllers from "@src/structClass/LinkedControllers";

export default class ControllerLoader<T extends Controller<any, any>> extends Loader<ControllerPackage<T>> {
    load(data : ControllerData, code : Code, linkedControllers : LinkedControllers<Controller<any, any>>) : T {
        
        const foundPackage = Object.values(this.packages).find((package_ : ControllerPackage<T>) => {
            return data.packageId === package_.id && data.packageVersion === package_.version;
        });

        const Class = foundPackage.body[data.id];

        const instance = new Class(data.data, code, linkedControllers);
        return instance;
    }
}