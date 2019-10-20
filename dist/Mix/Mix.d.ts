import Controller from "../Element/Controller";
import CodeLoader from "../Loader/CodeLoader";
import Code from "../Element/Code";
import LinkingPoint from "../structClass/LinkingPoint";
import MixData from "../struct/MixData";
import LinkedControllers from "@src/structClass/LinkedControllers";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
declare type Controllers = {
    [name: string]: Controller;
};
export default class Mix {
    controllerLoaders: ControllerLoaders;
    codeLoader: CodeLoader;
    mixData: MixData;
    code: Code;
    linkingPoints: {
        [linkingPointName: string]: LinkingPoint;
    };
    controllers: Controllers;
    linkedControllerses: {
        [controllerName: string]: LinkedControllers;
    };
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, mixData: MixData);
    loadMix(mixData: MixData): Mix;
    addDefaultLinkingPoints(names: string[]): void;
    addLinkingPoint(name: string): void;
    removeLinkingPoint(name: string): void;
    link(name: string, mixData: MixData): void;
    unlink(name: string): void;
    runOnExistLinkingPoints(f: (linkingPointName: string, linkedMix: Mix) => any): void;
    addController(name: string): Controller;
    removeController(name: string): void;
}
export {};
