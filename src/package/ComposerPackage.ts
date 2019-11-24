
import Composer from "../element/Composer";
import Context from "../Element/Context";
import ContextData from "../struct/ContextData";

export default interface ComposerPackage {
    id: string
    version: string
    body: {
        new(contextData:ContextData, context : Context) : Composer
    }
}