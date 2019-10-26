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
import Code from "@src/Element/Code";
import Mix from "@src/Mix/Mix";

declare interface LinkingPoint {
    on(event : "link" | "unlink", listener : (code : Mix) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "link" | "unlink", ) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class LinkingPoint extends EventEmitter {
    linked : Mix

    constructor(linked : Mix = undefined) {
        super();
        this.linked = linked;
    }

    link(code : Mix) {
        this.emit("link", code);
        this.linked = code;
    }

    unlink() {
        this.emit("unlink", this.linked)
        this.linked = undefined;
    }
}

export default LinkingPoint;