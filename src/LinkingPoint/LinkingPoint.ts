

import EventEmitter from "wolfy87-eventemitter";

declare interface LinkingPoint<D> {
    on(event : "linked", listener : (data : D) => void) : this
    on(event : "unlinked", listener : () => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "linked", data : D) : this
    emit(event : "unlinked") : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class LinkingPoint<D> extends EventEmitter {
    linked : D

    constructor() {
        super();
        this.linked = undefined;
    }

    link(data : D) {
        this.linked = data;
        this.emit("linked", data);

        return this.linked;
    }

    unlink() {
        this.linked = undefined;
        this.emit("unlinked")
    }
}

export default LinkingPoint;