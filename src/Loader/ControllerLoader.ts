
import Loader from "./ElementLoader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";

import LinkedControllers from "@src/structClass/LinkedControllers";
import CodeData from "../struct/CodeData";
import Context from "@src/structClass/Context";
import Data from "@src/struct/Data";

export default class ControllerLoader<T extends Controller> extends Loader<ControllerPackage<T>> {
    load(code : Code, codeData : CodeData, linkedControllers : LinkedControllers, data : Data, context : Context) : T {
        
        const foundPackage = Object.values(this.packages).find((package_ : ControllerPackage<T>) => {
            return codeData.packageId === package_.for_id && codeData.packageVersion === package_.for_version;
        });

        const Class = foundPackage.body[codeData.id];

        const instance = new Class(code, linkedControllers, data, context);
        return instance;
    }
}