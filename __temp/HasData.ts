
import EventEmitter from "wolfy87-eventemitter";
import Data from "@src/struct/Data";

declare interface HasData {
    on(event : "changed", listener : () => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "changed", ) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class HasData extends EventEmitter {
    private data: Data;
    constructor(data : Data) {
        super();
        this.data = data;
    }

    //만들다 보니 어째 리액트랑 비슷한 구조다. setState..
    protected changeData(f : (data : Data) => void) {
        //const oldData = JSON.parse(JSON.stringify(this.data));
        f(this.data);

        this.emit("dataChanged");
    }

    protected getData() {
        return this.data;
    }
}

export default HasData;