
import Loader from "./ElementLoader";
import Code from "../Element/Code";
import CodePackage from "../Package/CodePackage";
import CodeData from "../struct/CodeData";

import Context from "../structClass/Context";
import ControllerLoaders from "../structClass/ControllerLoaders";
import Packages from "../Package/Packages";
import Contexts from "../structClass/Contexts";

export default class CodeLoader extends Loader<CodePackage> {
    controllerLoaders: ControllerLoaders;
    constructor(packages : Packages<CodePackage>, controllerLoaders : ControllerLoaders, contexts : Contexts) {
        super(packages);
        this.controllerLoaders = controllerLoaders;
    }
    load(codeData : CodeData, contexts : Contexts) : Code {
        const foundPackage = Object.values(this.packages).find((package_ : CodePackage) => {
            return codeData.iD.packageId === package_.id && codeData.iD.packageVersion === package_.version;
        });

        const Class = foundPackage.body[codeData.iD.id];

        const instance = new Class(this, this.controllerLoaders, codeData, contexts);
        return instance;
    }
}