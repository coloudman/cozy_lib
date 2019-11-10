import Loader from "./ElementLoader";
import Code from "../Element/Code";
import CodePackage from "../Package/CodePackage";
import CodeData from "../struct/CodeData";
import ControllerLoaders from "../structClass/ControllerLoaders";
import Packages from "../Package/Packages";
import Contexts from "../structClass/Contexts";
export default class CodeLoader extends Loader<CodePackage> {
    controllerLoaders: ControllerLoaders;
    contexts: Contexts;
    constructor(packages: Packages<CodePackage>, controllerLoaders: ControllerLoaders, contexts: Contexts);
    load(codeData: CodeData): Code;
}
