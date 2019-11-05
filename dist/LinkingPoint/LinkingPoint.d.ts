import EventEmitter from "wolfy87-eventemitter";
declare interface LinkingPoint<T> {
    on(event: "linked" | "unlinked", listener: (object: T) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "linked" | "unlinked"): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class LinkingPoint<T> extends EventEmitter {
    linked: T;
    constructor(linked?: T);
    link(code: T): void;
    unlink(): void;
}
export default LinkingPoint;
