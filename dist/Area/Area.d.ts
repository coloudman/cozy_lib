import CodeLoader from "@src/Loader/CodeLoader";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import Mix from "../Mix/Mix";
import Controller from "@src/Element/Controller";
import RootMixData from "@src/struct/RootMixData";
import RootMix from "@src/structClass/RootMix";
import EventEmitter from "wolfy87-eventemitter";
declare interface Area {
    on(event: "rootMixAdded" | "rootMixRemoved", listener: (rootMix: RootMix) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "rootMixAdded" | "rootMixRemoved", rootMix: RootMix): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class Area extends EventEmitter {
    codeLoader: CodeLoader;
    controllerLoaders: ControllerLoaders;
    rootMixes: RootMix[];
    controllerNames: string[];
    rootMixDatas: RootMixData[];
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, mixDatas: RootMixData[]);
    addRootMix(rootMixData: RootMixData): Mix;
    removeRootMix(rootMix: RootMix): void;
    getController(controllerName: string): Controller[];
    addController(controllerName: string): void;
}
export default Area;
