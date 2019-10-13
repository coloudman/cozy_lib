
import Controller from "../Element/Controller";
import ControllerLoader from "../Loader/ControllerLoader";
import CodeLoader from "../Loader/CodeLoader";
import Code from "../Element/Code";

import LinkingPoint from "../structClass/LinkingPoint";

import MixData from "../struct/MixData";
import ControllerData from "../struct/ControllerData";
import LinkingPoints from "@src/structClass/LinkingPoints";

type ControllerLoaders = {
    [name : string]: ControllerLoader<any>
};

type Controllers = {
    [name : string]: Controller<any, any>
}

export default class Mix {

    controllerLoaders: ControllerLoaders;
    codeLoader: CodeLoader;
    mixData: MixData;

    code: Code;
    controllers: Controllers;

    linkingPoints: {
        [name: string] : LinkingPoint
    }

    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, mixData : MixData) {

        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.mixData = mixData;

        this.controllers = {};
        this.linkingPoints = {};


        // 연결점 제작
        Object.entries(mixData.linkingPointsData).forEach(([name, data])=>{
            const point = new Mix(codeLoader, controllerLoaders, data); //자기자신을 생성
            this.linkingPoints[name] = new LinkingPoint(point);
        });

        // 코드 제작
        this.code = this.codeLoader.load(mixData.codeData, this);

        // 컨트롤러 제작
        Object.entries(mixData.controllerDatas).forEach(([name, controllerData]) => {
            this.controllers[name] = this.controllerLoaders[name].load(controllerData, this.code);
        });


        /*
        특정 Controller는 Code에만 접근 할 것.
        Mix로 접근 비권장.
        */
    }

    // 연결점 연결
    addLinkingPoint(name : string) {
        this.linkingPoints[name] = new LinkingPoint();

        this.linkingPoints[name]
        .on("link", (mix: Mix) => {
            this.mixData.linkingPointsData[name] = {
                codeData:mix.mixData.codeData,
                controllerDatas:mix.mixData.controllerDatas,
                linkingPointsData:mix.mixData.linkingPointsData
            };
        })
        .on("unlink", (mix:Mix) => {
            delete this.mixData.linkingPointsData[name];
        })
    }
    removeLinkingPoint(name : string) {
        delete this.linkingPoints[name];
    }

    // 컨트롤러 연결
    linkController(name : string, controllerData : ControllerData) {
        this.controllers[name] = this.controllerLoaders[name].load(controllerData, this.code);
    }
}