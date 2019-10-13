const { Code } = require("../dist/index.js");


class Plus extends Code {
    init() {
        if(!this.linkingPoints.first) {
            this.addLinkingPoint("first");
        }
        if(!this.linkingPoints.second) {
            this.addLinkingPoint("second");
        }
    }
}

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

module.exports = {
    id:"MATH",
    version:"1",
    body: {
        Plus,
        Number
    }
}