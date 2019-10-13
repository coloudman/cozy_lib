import Code from "../Element/Code";
export default class CodeArea {
    readonly codes: Code[];
    constructor(codes: Code[]);
    putCode(code: Code): void;
    removeCode(code: Code): void;
}
