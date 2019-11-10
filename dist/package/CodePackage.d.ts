import Code from "../Element/Code";
import Package from "./Package";
import ControllerLoaders from "../structClass/ControllerLoaders";
import CodeData from "../struct/CodeData";
import Context from "../structClass/Context";
import CodeLoader from "../Loader/CodeLoader";
export default interface CodePackage extends Package<Code> {
    body: {
        [name: string]: {
            new (codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, codeData: CodeData, contexts: {
                [controllerName: string]: Context;
            }): Code;
        };
    };
}
