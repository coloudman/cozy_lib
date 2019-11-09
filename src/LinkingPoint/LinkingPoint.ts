

import EventEmitter from "wolfy87-eventemitter";

declare interface LinkingPoint<D,T> {
    on(event : "linked", listener : (object : T, data : D) => void) : this
    on(event : "unlinked", listener : () => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "linked", object : T, data : D) : this
    emit(event : "unlinked") : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

abstract class LinkingPoint<D,T> extends EventEmitter {
    linked : T

    constructor() {
        super();
        this.linked = undefined;
    }

    abstract loadData(data : D) : T

    link(data : D) {
        this.linked = this.loadData(data);
        this.emit("linked", this.linked, data);

        return this.linked;
    }

    unlink() {
        this.linked = undefined;
        this.emit("unlinked")
    }
}

export default LinkingPoint;