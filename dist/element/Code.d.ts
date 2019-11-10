import ControllerLoaders from "../structClass/ControllerLoaders";
import CodeLoader from "../Loader/CodeLoader";
import CodeData from "../struct/CodeData";
import Controller from "./Controller";
import Context from "../structClass/Context";
import CodeLinkingPointsManager from "../LinkingPoint/CodeLinkingPointsManager";
declare class Code {
    codeLinkingPointsManager: CodeLinkingPointsManager;
    private controllerLinkingPointsManagers;
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
    getController(name: string): Controller;
    addLinkingPoint(name: string): import("../LinkingPoint/LinkingPoint").default<CodeData, Code>;
    removeLinkingPoint(name: string): void;
    addDefaultLinkingPoints(names: string[]): void;
    link(name: string, codeData: CodeData): Code;
    unlink(name: string): void;
    getLinkingPoints(): import("..").LinkingPoints<CodeData, Code>;
    getLinkingPoint(name: string): import("../LinkingPoint/LinkingPoint").default<CodeData, Code>;
    getLinked(name: string): Code;
}
export default Code;
