const { Compiler } = require("../dist/index.js");


class Plus extends Compiler {
    init() {
        console.log("Compiler! - Plus");

    }
    compile() {
        return `(${this.code.linkingPoints.first.linkedMix.controllers.compiler.compile()}) + (${this.code.linkingPoints.second.linkedMix.controllers.compiler.compile()})`;
    }
}

class Number extends Compiler {
    init() {
        console.log("Compiler! - Number")
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