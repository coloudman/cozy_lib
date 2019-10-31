

const { Controller } = require("../../dist/index");
console.log(Controller);

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
        return `(${this.linkedControllers.first.compile()}) + (${this.linkedControllers.second.compile()})`;
    }
}

class Subtract extends Controller {
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