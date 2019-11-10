import Code from "./Code";
import Data from "../struct/Data";
import Context from "../structClass/Context";
import EventEmitter from "wolfy87-eventemitter";
import ControllerLinkingPointsManager from "../LinkingPoint/ControllerLinkingPointsManager";
declare interface Controller {
    on(event: "init" | "stop", listener: () => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "init" | "stop"): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare abstract class Controller extends EventEmitter {
    code: Code;
    data: Data;
    context: Context;
    linkingPointsManager: ControllerLinkingPointsManager;
    constructor(code: Code, data: Data, context: Context, linkingPointsManager: ControllerLinkingPointsManager);
    getLinkingPoints(): import("..").LinkingPoints<Controller, Controller>;
    getLinkingPoint(name: string): import("../LinkingPoint/LinkingPoint").default<Controller, Controller>;
    getLinked(name: string): Controller;
    stop(): void;
}
export default Controller;
