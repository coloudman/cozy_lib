import LinkingPoint from "./LinkingPoint";
import EventEmitter from "wolfy87-eventemitter";
import LinkingPoints from "./LinkingPoints";


declare interface LinkingPointsManager<D> {
    on(event : "added", listener : (linkingPointName : string, linkingPoint : LinkingPoint<D>) => void) : this
    on(event : "removed", listener : (linkingPointName : string) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "added", linkingPointName : string, linkingPoint : LinkingPoint<D>) : this
    emit(event : "removed", linkingPointName : string) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

abstract class LinkingPointsManager<D> extends EventEmitter {
    linkingPoints: LinkingPoints<D>

    constructor() {
        super();
        this.linkingPoints = {};
    }
    
    abstract createLinkingPoint() : LinkingPoint<D>

    addLinkingPoint(name : string) {
        const linkingPoint = this.linkingPoints[name] = this.createLinkingPoint();
        this.emit("added", name, linkingPoint);

        return linkingPoint;
    }
    removeLinkingPoint(name : string) {
        delete this.linkingPoints[name];
        this.emit("removed", name);
    }
    link(name : string, data : D) {
        return this.linkingPoints[name].link(data);
    }
    unlink(name : string) {
        this.linkingPoints[name].unlink();
    }

    //뭐 그냥 그런거
    getLinkingPoint(name : string) {
        return this.linkingPoints[name];
    }
    getLinked(name : string) {
        return this.linkingPoints[name].linked;
    }
    getLinkingPoints() {
        return this.linkingPoints;
    }
}


export default LinkingPointsManager;