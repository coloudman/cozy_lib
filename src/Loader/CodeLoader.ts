
import Loader from "./ElementLoader";
import Code from "../Element/Code";
import CodePackage from "../Package/CodePackage";
import CodeData from "../struct/CodeData";

import Context from "@src/structClass/Context";
import ControllerLoaders from "@src/structClass/ControllerLoaders";

export default class CodeLoader extends Loader<CodePackage> {

    load(controllerLoaders : ControllerLoaders, codeData : CodeData, contexts : {[controllerName:string]:Context}) : Code {
        const foundPackage = Object.values(this.packages).find((package_ : CodePackage) => {
            return codeData.iD.packageId === package_.id && codeData.iD.packageVersion === package_.version;
        });

        const Class = foundPackage.body[codeData.iD.id];

        const instance = new Class(this, controllerLoaders, codeData, contexts);
        return instance;
    }
}