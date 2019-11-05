import LinkingPoint from "./LinkingPoint";
import EventEmitter from "wolfy87-eventemitter";


declare interface LinkingPointsManager<T> {
    on(event : "added" | "removed", listener : (linkingPointName : string) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "added" | "removed", linkingPointName : string) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class LinkingPointsManager<T> extends EventEmitter {
    linkingPoints: {
        [linkingPointName : string]: LinkingPoint<T>
    }

    constructor() {
        super();
        this.linkingPoints = {};
    }
    
    addLinkingPoint(name : string) {
        const linkingPoint = this.linkingPoints[name] = new LinkingPoint<T>();
        this.emit("added", name);

        return linkingPoint;
    }
    removeLinkingPoint(name : string) {
        delete this.linkingPoints[name];
        this.emit("removed", name);
    }
    link(name : string, t : T) {
        this.linkingPoints[name].link(t);
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
}


export default LinkingPointsManager;