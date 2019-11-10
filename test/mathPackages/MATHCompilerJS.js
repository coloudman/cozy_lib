

const { Controller } = require("../../dist/index");

class Number extends Controller {
    init() {
    }
    compile() {
        return this.code.getNumber()+"";
    }
}

class BinaryOperator extends Controller {
    init() {}
    make(symbol) {
        const space = this.context.space ? " " : "";
        return `(${this.getLinked("first").compile()})${space}${symbol}${space}(${this.getLinked("second").compile()})`;
    }
}

class Add extends BinaryOperator{
    compile() {
        return this.make("+");
    }
}

class Subtract extends BinaryOperator {
    compile() {
        return this.make("-");
    }
}

class Multiply extends BinaryOperator {
    compile() {
        return this.make("*");
    }
}

class Divide extends BinaryOperator {
    compile() {
        return this.make("/");
    }
}

class Power extends BinaryOperator {
    compile() {
        return this.make("**");
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
        Subtract,
        Multiply,
        Divide,
        Power
    }
}