import Code from "./Code";

import Data from "@src/struct/Data";
import Context from "@src/structClass/Context";
import LinkingPointsManager from "@src/LinkingPoint/LinkingPointsManager";
import EventEmitter from "wolfy87-eventemitter";
import ControllerLinkingPointsManager from "@src/LinkingPoint/ControllerLinkingPointsManager";

declare interface Controller {
    on(event : "init" | "stop", listener : () => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "init" | "stop") : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

abstract class Controller extends EventEmitter {
    code: Code
    data: Data
    context: Context
    linkingPointsManager: ControllerLinkingPointsManager;

    constructor(code : Code, data:Data, context:Context, linkingPointsManager : ControllerLinkingPointsManager) {
        super();

        this.code = code;
        this.linkingPointsManager = linkingPointsManager;
        this.data = data;
        this.context = context;

        this.emit("init");
    }

    getLinkingPoints() {
        return this.linkingPointsManager.linkingPoints;
    }
    getLinkingPoint(name : string) {
        return this.linkingPointsManager.getLinkingPoint(name);
    }
    getLinked(name : string) {
        return this.linkingPointsManager.getLinked(name);
    }
    
    stop() {
        this.emit("stop");
    }
};

export default Controller;