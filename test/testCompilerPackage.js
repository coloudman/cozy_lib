const { Compiler } = require("../dist/index.js");


class Plus extends Compiler {
    init() {

    }
    compile() {
        return `(${this.linkedControllers.first.compile()}) + (${this.linkedControllers.second.compile()})`;
    }
}

class Number extends Compiler {
    init() {
        
    }
    compile() {
        return this.code.getNumber()+"";
    }
}

module.exports = {
    id:"JS_MATH",
    version:"1",
    for_id:"MATH",
    for_version:"1",
    body: {
        Plus,
        Number
    }
}