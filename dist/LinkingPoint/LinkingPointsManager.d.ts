import LinkingPoint from "./LinkingPoint";
import EventEmitter from "wolfy87-eventemitter";
declare interface LinkingPointsManager<T> {
    on(event: "added" | "removed", listener: (linkingPointName: string) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "added" | "removed", linkingPointName: string): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare class LinkingPointsManager<T> extends EventEmitter {
    linkingPoints: {
        [linkingPointName: string]: LinkingPoint<T>;
    };
    constructor();
    addLinkingPoint(name: string): LinkingPoint<T>;
    removeLinkingPoint(name: string): void;
    link(name: string, t: T): void;
    unlink(name: string): void;
    getLinkingPoint(name: string): LinkingPoint<T>;
    getLinked(name: string): T;
}
export default LinkingPointsManager;
