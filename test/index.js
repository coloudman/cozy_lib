
import { Code } from "../src/index";

class Plus extends Code {
    init() {
        this.linkingpoint = this.addLinkingPoint("ONE");
    }
}

new Plus({},)