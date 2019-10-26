import EventEmitter from "wolfy87-eventemitter";
import Mix from "@src/Mix/Mix";
declare interface LinkingPoint {
    on(event: "link" | "unlink", listener: (code: Mix) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "link" | "unlink"): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class LinkingPoint extends EventEmitter {
    linked: Mix;
    constructor(linked?: Mix);
    link(code: Mix): void;
    unlink(): void;
}
export default LinkingPoint;
