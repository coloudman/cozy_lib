import EventEmitter from "wolfy87-eventemitter";
import Code from "./Code";
declare interface LinkingPoint {
    on(event: "link" | "unlink", listener: (code: Code) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
}
declare class LinkingPoint extends EventEmitter {
    private _linkedCode;
    readonly linkedCode: Code;
    constructor(linkedCode?: Code);
    link(code: Code): void;
    unlink(): void;
}
export default LinkingPoint;
