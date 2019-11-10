import CodeLoader from "../Loader/CodeLoader";
import CodeData from "../struct/CodeData";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import EventEmitter from "wolfy87-eventemitter";
import Context from "../structClass/Context";
declare interface Area {
    on(event: "codeAdded" | "codeRemoved", listener: (code: Code) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "codeAdded" | "codeRemoved", code: Code): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class Area extends EventEmitter {
    codeLoader: CodeLoader;
    codes: Code[];
    controllerNames: string[];
    codeDatas: CodeData[];
    contexts: {
        [controllerName: string]: Context;
    };
    constructor(codeLoader: CodeLoader, codeDatas: CodeData[], contexts: {
        [controllerName: string]: Context;
    });
    addCode(codeData: CodeData): Code;
    removeCode(code: Code): void;
    getController(controllerName: string): Controller[];
    addController(controllerName: string): void;
}
export default Area;
