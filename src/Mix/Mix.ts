
import Controller from "../Element/Controller";
import CodeLoader from "../Loader/CodeLoader";
import Code from "../Element/Code";

import LinkingPoint from "../structClass/LinkingPoint";

import MixData from "../struct/MixData";
import LinkedControllers from "@src/structClass/LinkedControllers";
import ControllerLoaders from "@src/structClass/ControllerLoaders";

type Controllers = {
    [name : string]: Controller
}

export default class Mix {

    controllerLoaders: ControllerLoaders;
    codeLoader: CodeLoader;
    mixData: MixData;

    code: Code;
    controllers: Controllers;

    linkingPoints: {
        [controllerName: string] : LinkingPoint
    }
    linkedControllerses: {
        [controllerName: string] : LinkedControllers<Controller>
    }

    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, mixData : MixData) {

        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.mixData = mixData;

        this.controllers = {};
        this.linkingPoints = {};

        this.linkedControllerses = {}


        // 연결점 제작
        Object.entries(mixData.linkingPointsData).forEach(([name, data])=>{
            const point = new Mix(codeLoader, controllerLoaders, data); //자기자신을 생성
            this.linkingPoints[name] = new LinkingPoint(point);
        });

        // 코드 제작
        this.code = this.codeLoader.load(mixData.codeData, this);

        // 컨트롤러 제작
        Object.entries(controllerLoaders).forEach(([controllerLoaderName, controllerLoader]) => {
            const linkedControllers = this.makeLinkedControllers(controllerLoaderName);
            this.controllers[controllerLoaderName] = controllerLoader.load(this.code, this.mixData.codeData, linkedControllers);
        });


        /*
        특정 Controller는 Code에만 접근 할 것.
        Mix로 접근 비권장.
        */
    }

    //유틸적인 '멤버' 임, 특정 컨트롤러에 대한 연결 관계를 생성함. 갱신도 되지만 갱신용으로는 쓰지 말자..
    makeLinkedControllers(controllerName : string) {
        const linkedControllers = {} as LinkedControllers<Controller>;
        Object.entries(this.linkingPoints).forEach(([linkingPointName, linkingPoint]) => {
            if(linkingPoint.linkedMix) {
                linkedControllers[linkingPointName] = linkingPoint.linkedMix.controllers[controllerName];
            }
        });
        return this.linkedControllerses[controllerName] = linkedControllers;
    }

    // 연결점 연결
    addLinkingPoint(name : string) {
        this.linkingPoints[name] = new LinkingPoint();

        //중요! 연결점에 기본 이벤트 등록
        this.linkingPoints[name]
        .on("link", (mix: Mix) => {
            //링킹포인트데이터 등록
            this.mixData.linkingPointsData[name] = {
                codeData:mix.mixData.codeData,
                linkingPointsData:mix.mixData.linkingPointsData
            };
            //LinkedControllers 갱신
            Object.entries(mix.controllers).forEach(([controllerName, controller]) => {
                this.linkedControllerses[controllerName][name] = controller;
            });
        })
        .on("unlink", (mix:Mix) => {
            //링킹포인트데이터 삭제
            delete this.mixData.linkingPointsData[name];
            //LinkedControllers에서 삭제
            Object.entries(mix.controllers).forEach(([controllerName, controller]) => {
                delete this.linkedControllerses[controllerName][name];
            });
        })
    }
    removeLinkingPoint(name : string) {
        delete this.linkingPoints[name];
    }

    // 컨트롤러 연결
    linkController(name : string) {
        this.controllers[name] = this.controllerLoaders[name].load(this.code, this.mixData.codeData, this.makeLinkedControllers(name));
    }
}