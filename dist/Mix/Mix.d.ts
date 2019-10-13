import Controller from "../Element/Controller";
import ControllerLoader from "../Loader/ControllerLoader";
import CodeLoader from "../Loader/CodeLoader";
import Code from "../Element/Code";
import LinkingPoint from "../structClass/LinkingPoint";
import MixData from "../struct/MixData";
import ControllerData from "../struct/ControllerData";
declare type ControllerLoaders = {
    [name: string]: ControllerLoader<any>;
};
declare type Controllers = {
    [name: string]: Controller<any, any>;
};
export default class Mix {
    controllerLoaders: ControllerLoaders;
    codeLoader: CodeLoader;
    mixData: MixData;
    code: Code;
    controllers: Controllers;
    linkingPoints: {
        [name: string]: LinkingPoint;
    };
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, mixData: MixData);
    addLinkingPoint(name: string): void;
    removeLinkingPoint(name: string): void;
    linkController(name: string, controllerData: ControllerData): void;
}
export {};
