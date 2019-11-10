import Data from "../struct/Data";
import EventEmitter from "wolfy87-eventemitter";
declare class Context extends EventEmitter {
    protected data: Data;
    constructor(data: Data);
}
export default Context;
