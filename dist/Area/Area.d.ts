import CodeLoader from "@src/Loader/CodeLoader";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import Mix from "../Mix/Mix";
import Controller from "@src/Element/Controller";
import RootMixData from "@src/struct/RootMixData";
import RootMix from "@src/structClass/RootMix";
export default class Area {
    codeLoader: CodeLoader;
    controllerLoaders: ControllerLoaders;
    rootMixes: RootMix[];
    controllerNames: string[];
    rootMixDatas: RootMixData[];
    constructor(codeLoader: CodeLoader, controllerLoaders: ControllerLoaders, mixDatas: RootMixData[]);
    addRootMix(rootMixData: RootMixData): Mix;
    removeRootMix(rootMix: RootMix): void;
    getController(controllerName: string): Controller[];
    addController(controllerName: string): void;
}
