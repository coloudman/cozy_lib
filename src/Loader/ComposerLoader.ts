
import Loader from "./Loader";
import Code from "../Element/Code";
import CodePackage from "../Package/CodePackage";
import CodeData from "../struct/CodeData";

import Context from "../element/Context";
import ControllerLoaders from "../structClass/ControllerLoaders";
import Packages from "../Package/Packages";
import Contexts from "../structClass/Contexts";
import ContextPackage from "../package/ContextPackage";
import ContextData from "../struct/ContextData";
import Composer from "../element/Composer";
import ComposerData from "../struct/ComposerData";
import ComposerPackage from "../package/ComposerPackage";

export default class ComposerLoader  {
    packages: { [name: string]: ComposerPackage };
    constructor(packages : {[name:string]:ComposerPackage}) {
        this.packages = packages;
    }
    load(contextData : ComposerData, context:Context) : Composer {
        const foundPackage = Object.values(this.packages).find((package_ ) => {
            return contextData.iD.packageId === package_.id && contextData.iD.packageVersion === package_.version;
        });

        const Class = foundPackage.body;

        const instance = new Class(contextData, context);
        return instance;
    }
}