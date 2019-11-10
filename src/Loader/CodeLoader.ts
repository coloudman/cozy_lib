
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
    contexts: Contexts;
    constructor(packages : Packages<CodePackage>, controllerLoaders : ControllerLoaders, contexts : Contexts) {
        super(packages);
        this.controllerLoaders = controllerLoaders;
        this.contexts = contexts;
    }
    load(codeData : CodeData) : Code {
        const foundPackage = Object.values(this.packages).find((package_ : CodePackage) => {
            return codeData.iD.packageId === package_.id && codeData.iD.packageVersion === package_.version;
        });

        const Class = foundPackage.body[codeData.iD.id];

        const instance = new Class(this, this.controllerLoaders, codeData, this.contexts);
        return instance;
    }
}