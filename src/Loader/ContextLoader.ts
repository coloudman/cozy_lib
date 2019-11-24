
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

export default class ContextLoader  {
    packages: { [name: string]: ContextPackage; };
    constructor(packages : {[name:string]:ContextPackage}) {
        this.packages = packages;
    }
    load(contextData : ContextData) : Context {
        const foundPackage = Object.values(this.packages).find((package_ ) => {
            return contextData.iD.packageId === package_.id && contextData.iD.packageVersion === package_.version;
        });

        const Class = foundPackage.body;

        const instance = new Class(contextData);
        return instance;
    }
}