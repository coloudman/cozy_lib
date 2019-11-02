

const { Controller } = require("../../dist/index");

class Number extends Controller {
    init() {
    }
    compile() {
        return this.code.getNumber()+"";
    }
}

class Add extends Controller {
    init() {
        this.code.linkingPoints.second.on("link",()=>{
            console.log(this.linkedControllers.second);
        });
    }
    compile() {
        const space = this.context.space ? " " : "";
        return `(${this.linkedControllers.first.compile()})${space}+${space}(${this.linkedControllers.second.compile()})`;
    }
}

class Subtract extends Controller {
    init() {

    }
    compile() {
        const space = this.context.space ? " " : "";
        return `(${this.linkedControllers.first.compile()})${space}-${space}(${this.linkedControllers.second.compile()})`;
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