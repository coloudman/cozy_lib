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
    controllers: Controllers;
    linkingPoints: {
        [controllerName: string]: LinkingPoint;
    };
    linkedControllerses: {
        [controllerName: string]: LinkedControllers<Controller>;
    };
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, mixData: MixData);
    makeLinkedControllers(controllerName: string): LinkedControllers<Controller>;
    addLinkingPoint(name: string): void;
    removeLinkingPoint(name: string): void;
    linkController(name: string): void;
}
export {};
