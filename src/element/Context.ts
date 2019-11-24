

import Data from "../struct/Data";
import EventEmitter from "wolfy87-eventemitter";
import ContextData from "../struct/ContextData";

class Context extends EventEmitter {
    protected data: Data
    contextData: ContextData;
    constructor(contextData : ContextData) {
        super();
        this.contextData = contextData;
        this.data = this.contextData.data;
    }
    exportContextData() {
        return JSON.parse(JSON.stringify(this.contextData));
    }
}

export default Context;