import CodeLoader from "@src/Loader/CodeLoader";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import MixData from "@src/struct/MixData";
import Mix from "../Mix/Mix";
import Controller from "@src/Element/Controller";
import RootMixData from "@src/struct/RootMixData";
import RootMix from "@src/structClass/RootMix";

import EventEmitter from "wolfy87-eventemitter";


declare interface Area {
    on(event : "rootMixAdded" | "rootMixRemoved", listener : (rootMix : RootMix) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "rootMixAdded" | "rootMixRemoved", rootMix : RootMix) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class Area extends EventEmitter {
    /*
    같은 Loader들을 가지는 Mix들의 집합 존재 공간
    */

    codeLoader: CodeLoader;
    controllerLoaders: ControllerLoaders;
    rootMixes: RootMix[];
    controllerNames: string[];
    rootMixDatas: RootMixData[];
    
    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, mixDatas : RootMixData[]) {
        super();

        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.rootMixes = [];
        this.controllerNames = [];

        this.rootMixDatas = mixDatas;

        mixDatas.forEach(rootMixData => {
            this.addRootMix(rootMixData);
        });
    }

    addRootMix(rootMixData : RootMixData) : Mix {
        const mix = new Mix(this.codeLoader, this.controllerLoaders, rootMixData.mixData);
        this.controllerNames.forEach(controllerName => {
            mix.addController(controllerName);
        });
        const rootMix = {
            mix:mix,
            data:rootMixData.data
        };
        this.rootMixes.push(rootMix);
        //Data
        this.rootMixDatas.push(rootMixData);

        //event
        this.emit("rootMixAdded", rootMix);
        return mix;
    }
    removeRootMix(rootMix : RootMix) {
        const mixIndex = this.rootMixes.indexOf(rootMix);
        this.rootMixes.splice(mixIndex, 1);
        //Data
        this.rootMixDatas.splice(mixIndex, 1);

        //event
        this.emit("rootMixRemoved", rootMix);
    }

    getController(controllerName : string) : Controller[] {
        const controllers : Controller[] = [];
        this.rootMixes.forEach(rootMix => {
           controllers.push(rootMix.mix.controllers[controllerName]);
        });
        return controllers;
    }

    addController(controllerName : string) {
        this.rootMixes.forEach(rootMix => {
            rootMix.mix.addController(controllerName);
        });
        this.controllerNames.push(controllerName);
    }
}

export default Area;