const { Compiler } = require("../dist/index.js");


class Number extends Compiler {
    init() {
        
    }
    compile() {
        return this.code.getNumber()+"";
    }
}

class Add extends Compiler {
    init() {

    }
    compile() {
        return `(${this.linkedControllers.first.compile()}) + (${this.linkedControllers.second.compile()})`;
    }
}

class Subtract extends Compiler {
    init() {

    }
    compile() {
        return `(${this.linkedControllers.first.compile()}) - (${this.linkedControllers.second.compile()})`;
    }
}

module.exports = {
    id:"JS_MATH",
    version:"1",
    for_id:"MATH",
    for_version:"1",
    body: {
        Number,
        Add,
        Subtract
    }
}