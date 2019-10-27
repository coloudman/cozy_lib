import CodeLoader from "@src/Loader/CodeLoader";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import MixData from "@src/struct/MixData";
import Mix from "../Mix/Mix";
import Controller from "@src/Element/Controller";
import EventEmitter from "wolfy87-eventemitter";
declare interface Area {
    on(event: "mixAdded" | "mixRemoved", listener: (mix: Mix) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "mixAdded" | "mixRemoved", mix: Mix): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class Area extends EventEmitter {
    codeLoader: CodeLoader;
    controllerLoaders: ControllerLoaders;
    mixes: Mix[];
    controllerNames: string[];
    mixDatas: MixData[];
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, mixDatas: MixData[]);
    addMix(mixData: MixData): Mix;
    removeMix(mix: Mix): void;
    getController(controllerName: string): Controller[];
    addController(controllerName: string): void;
}
export default Area;
