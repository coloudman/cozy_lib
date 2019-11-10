

import Data from "../struct/Data";
import EventEmitter from "wolfy87-eventemitter";

class Context extends EventEmitter {
    protected data: Data
    constructor(data : Data) {
        super();
        this.data = data;
    }
}

export default Context;