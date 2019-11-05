/*
import EventEmitter from "wolfy87-eventemitter";
import Data from "@src/struct/Data";
import Element from "../Element/Element";

declare interface LinkingPoint<T extends Element<any, T>> {
    on(event : "link" | "unlink", listener : (code : T) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "link" | "unlink", ) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class LinkingPoint<T extends Element<any, T>> extends EventEmitter {
    private _linkedCode : T
    get linkedCode() {
        return this._linkedCode;
    }

    constructor(linkedCode : T = undefined) {
        super();
        this._linkedCode = linkedCode;
    }

    link(code : T) {
        this.emit("link", code);
        this._linkedCode = code;
    }

    unlink() {
        this.emit("unlink", this._linkedCode)
        this._linkedCode = undefined;
    }
}

export default LinkingPoint;

*/


import EventEmitter from "wolfy87-eventemitter";

declare interface LinkingPoint<T> {
    on(event : "linked" | "unlinked", listener : (object : T) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "linked" | "unlinked", ) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class LinkingPoint<T> extends EventEmitter {
    linked : T

    constructor(linked : T = undefined) {
        super();
        this.linked = linked;
    }

    link(code : T) {
        this.linked = code;
        this.emit("linked", code);
    }

    unlink() {
        this.linked = undefined;
        this.emit("unlinked", this.linked)
    }
}

export default LinkingPoint;