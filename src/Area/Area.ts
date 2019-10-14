import CodeLoader from "@src/Loader/CodeLoader";
import ControllerLoaders from "@src/structClass/ControllerLoaders";



export default class Area {
    codeLoader: CodeLoader;
    controllerLoaders: ControllerLoaders;
    
    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders) {
        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
    }
}