import ControllerLoaders from "../structClass/ControllerLoaders";
import CodeLoader from "../Loader/CodeLoader";
import CodeData from "../struct/CodeData";
import Controller from "./Controller";
import Context from "../structClass/Context";
import LinkingPoint from "@src/LinkingPoint/LinkingPoint";
declare abstract class Code {
    private codeLinkingPointsManager;
    private controllerLinkingPointsManagers;
    abstract init(): any;
    controllerLoaders: ControllerLoaders;
    codeLoader: CodeLoader;
    codeData: CodeData;
    contexts: {
        [controllerName: string]: Context;
    };
    controllers: {
        [name: string]: Controller;
    };
    data: any;
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, codeData: CodeData, contexts: {
        [controllerName: string]: Context;
    });
    runOnExistLinkingPoints(f: (linkingPointName: string, linked: Code) => any): void;
    addController(name: string): Controller;
    removeController(name: string, withData?: boolean): void;
    addLinkingPoint(name: string): LinkingPoint<Code>;
    removeLinkingPoint(name: string): void;
    addDefaultLinkingPoints(names: string[]): void;
    link(name: string, codeData: CodeData): void;
    unlink(name: string): void;
    getLinkingPoint(name: string): LinkingPoint<Code>;
    getLinked(name: string): Code;
}
export default Code;
