import Code from "../Element/Code";

export default class CodeArea {
    readonly codes: Code[]

    constructor(codes : Code[]) {
        this.codes = codes;
    }

    putCode(code : Code) {
        this.codes.push(code);
    }

    removeCode(code : Code) {
        this.codes.splice(this.codes.indexOf(code), 1);
    }
}