import Loader from "./ElementLoader";
import Code from "../Element/Code";
import CodePackage from "../Package/CodePackage";
import CodeData from "../struct/CodeData";
import Context from "@src/structClass/Context";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
export default class CodeLoader extends Loader<CodePackage> {
    load(controllerLoaders: ControllerLoaders, codeData: CodeData, contexts: {
        [controllerName: string]: Context;
    }): Code;
}
