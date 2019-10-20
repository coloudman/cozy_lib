import CodeLoader from "@src/Loader/CodeLoader";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import MixData from "@src/struct/MixData";
import Mix from "../Mix/Mix";
import Controller from "@src/Element/Controller";
export default class Area {
    codeLoader: CodeLoader;
    controllerLoaders: ControllerLoaders;
    mixes: Mix[];
    controllerNames: string[];
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders);
    addMix(mixData: MixData): Mix;
    removeMix(mix: Mix): void;
    getController(controllerName: string): Controller[];
    addController(controllerName: string): void;
}
