import EventEmitter from "wolfy87-eventemitter";
import Mix from "../Mix/Mix";
declare interface LinkingPoint {
    on(event: "link" | "unlink", listener: (code: Mix) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "link" | "unlink"): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class LinkingPoint extends EventEmitter {
    linkedMix: Mix;
    constructor(linkedMix?: Mix);
    link(code: Mix): void;
    unlink(): void;
}
export default LinkingPoint;
