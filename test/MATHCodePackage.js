const { Code } = require("../dist/index.js");


class Number extends Code {
    init() {
    }
    setNumber(number) {
        this.data.number = number;
    }
    getNumber() {
        return this.data.number;
    }
}


class BinaryOperator extends Code {
    init() {
        this.addDefaultLinkingPoints(["first","second"]);
    }
}

class Add extends BinaryOperator {}

class Subtract extends BinaryOperator {}

class Multiply extends BinaryOperator {}

class Divide extends BinaryOperator {}

class Power extends BinaryOperator {}


module.exports = {
    id:"MATH",
    version:"1",
    body: {
        Number,
        Add,
        Subtract,
        Multiply,
        Divide,
        Power
    }
}