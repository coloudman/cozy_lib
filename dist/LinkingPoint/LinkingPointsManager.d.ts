import LinkingPoint from "./LinkingPoint";
import EventEmitter from "wolfy87-eventemitter";
import LinkingPoints from "./LinkingPoints";
declare interface LinkingPointsManager<D, T> {
    on(event: "added", listener: (linkingPointName: string, linkingPoint: LinkingPoint<D, T>) => void): this;
    on(event: "removed", listener: (linkingPointName: string) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "added", linkingPointName: string, linkingPoint: LinkingPoint<D, T>): this;
    emit(event: "removed", linkingPointName: string): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare abstract class LinkingPointsManager<D, T> extends EventEmitter {
    linkingPoints: LinkingPoints<D, T>;
    constructor();
    abstract createLinkingPoint(): LinkingPoint<D, T>;
    addLinkingPoint(name: string): LinkingPoint<D, T>;
    removeLinkingPoint(name: string): void;
    link(name: string, data: D): T;
    unlink(name: string): void;
    getLinkingPoint(name: string): LinkingPoint<D, T>;
    getLinked(name: string): T;
    getLinkingPoints(): LinkingPoints<D, T>;
}
export default LinkingPointsManager;
