
import Loader from "./Loader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";

import LinkedControllers from "@src/structClass/LinkedControllers";
import CodeData from "../struct/CodeData";

export default class ControllerLoader<T extends Controller> extends Loader<ControllerPackage<T>> {
    load(code : Code, codeData : CodeData, linkedControllers : LinkedControllers<Controller>) : T {
        
        const foundPackage = Object.values(this.packages).find((package_ : ControllerPackage<T>) => {
            return codeData.packageId === package_.for_id && codeData.packageVersion === package_.for_version;
        });

        const Class = foundPackage.body[codeData.id];

        const instance = new Class(code, linkedControllers);
        return instance;
    }
}