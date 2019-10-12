import Code from "./Code";
import Data from "@src/struct/Data";

export default abstract class Controller<T extends Controller<T>> {
    data: object
    loadCode: (data : Data) => T
    protected code: Code

    constructor(data : object, loadCode : (data : Data) => T, code : Code) {
        this.data = data;
        this.loadCode = loadCode;
        this.code = code;

        this.init();
    }

    abstract init():any
};