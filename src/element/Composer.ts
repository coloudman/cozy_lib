import Controller from "./Controller";
import Context from "./Context";
import ComposerData from "../struct/ComposerData";
import Data from "../struct/Data";

abstract class Composer {
    context: Context;
    composerData: ComposerData;
    protected data: Data
    constructor(composerData : ComposerData, context : Context) {
        this.composerData = composerData;
        this.data = composerData.data;
        this.context = context;
    }
    abstract compose(controllers : Controller[]) : any
}

export default Composer;