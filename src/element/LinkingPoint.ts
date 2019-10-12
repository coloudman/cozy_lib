
import EventEmitter from "wolfy87-eventemitter";
import Code from "./Code";

declare interface LinkingPoint {
    on(event : "link" | "unlink", listener : (code : Code) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this
}

class LinkingPoint extends EventEmitter {
    private _linkedCode : Code
    get linkedCode() {
        return this._linkedCode;
    }

    constructor(linkedCode : Code = undefined) {
        super();
        this._linkedCode = linkedCode;
    }

    link(code : Code) {
        this.emit("link", code);
        this._linkedCode = code;
    }

    unlink() {
        this.emit("unlink", this._linkedCode)
        this._linkedCode = undefined;
    }
}

export default LinkingPoint;