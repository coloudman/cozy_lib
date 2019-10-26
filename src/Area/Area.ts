import CodeLoader from "@src/Loader/CodeLoader";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import MixData from "@src/struct/MixData";
import Mix from "../Mix/Mix";
import Controller from "@src/Element/Controller";



export default class Area {
    /*
    같은 Loader들을 가지는 Mix들의 집합 존재 공간
    */

    codeLoader: CodeLoader;
    controllerLoaders: ControllerLoaders;
    mixes: Mix[];
    controllerNames: string[];
    mixDatas: MixData[];
    
    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, mixDatas : MixData[]) {
        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.mixes = [];
        this.controllerNames = [];

        this.mixDatas = mixDatas;

        mixDatas.forEach(mixData => {
            this.addMix(mixData);
        });
    }

    addMix(mixData : MixData) : Mix {
        const mix = new Mix(this.codeLoader, this.controllerLoaders, mixData);
        this.controllerNames.forEach(controllerName => {
            mix.addController(controllerName);
        });
        this.mixes.push(mix);
        //Data
        this.mixDatas.push(mixData);
        return mix;
    }
    removeMix(mix : Mix) {
        const mixIndex = this.mixes.indexOf(mix);
        this.mixes.splice(mixIndex, 1);
        //Data
        this.mixDatas.splice(mixIndex, 1);
    }

    getController(controllerName : string) : Controller[] {
        const controllers : Controller[] = [];
        this.mixes.forEach(mix => {
           controllers.push(mix.controllers[controllerName]);
        });
        return controllers;
    }

    addController(controllerName : string) {
        this.mixes.forEach(mix => {
            mix.addController(controllerName);
        });
        this.controllerNames.push(controllerName);
    }
}