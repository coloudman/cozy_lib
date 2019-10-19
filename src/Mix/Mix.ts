
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

    linkingPoints: {
        [linkingPointName: string] : LinkingPoint
    }

    controllers: Controllers

    //특정 타입 컨트롤러가 접근할 수 있는 링킹포인트에 있는 같은 타입의 컨트롤러들을 저장합니다. linkControllerses[컨트롤러 타입][링킹포인트 이름]
    linkedControllerses: {
        [controllerName: string] : LinkedControllers
    }

    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, mixData : MixData) {

        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.mixData = mixData;

        this.linkingPoints = {};

        this.linkedControllerses = {};
        this.controllers = {};


        // 연결점 제작
        Object.entries(mixData.linkingPointsData).forEach(([name, data])=>{
            this.addLinkingPoint(name);
            this.link(name, data);
        });

        // 코드 제작
        this.code = this.codeLoader.load(mixData.codeData, this);
    }

    loadMix(mixData : MixData) {
        return new Mix(this.codeLoader, this.controllerLoaders, mixData)
    }

    // 연결점 관련

    addDefaultLinkingPoints(names : [ string ]) {
        names.forEach(name => {
            if(!this.linkingPoints[name]) {
                this.addLinkingPoint(name);
            }
        });
    }
    addLinkingPoint(name : string) {
        this.linkingPoints[name] = new LinkingPoint();
    }
    removeLinkingPoint(name : string) {
        delete this.linkingPoints[name];
    }
    link(name : string, mixData : MixData) {

        //링킹포인트데이터 등록
        this.mixData.linkingPointsData[name] = {
            codeData:mixData.codeData,
            linkingPointsData:mixData.linkingPointsData
        };

        //Mix 로딩해서 등록
        this.linkingPoints[name].link(this.loadMix(mixData));

        //기존에 있던 컨트롤러-링킹포인트 접근 오브젝트들에 이 링킹포인트 추가
        Object.entries(this.linkedControllerses).forEach(([controllerType, controllers]) => {
            controllers[name] = this.linkingPoints[name].linkedMix.addController(controllerType);
        });
    }
    unlink(name : string) {
        delete this.linkingPoints[name];
        delete this.mixData.linkingPointsData[name];
    }

    //유틸, 모든 연결된 연결점에서 실행
    runOnExistLinkingPoints(f : (linkingPointName : string, linkedMix : Mix) => any) {
        Object.entries(this.linkingPoints).forEach(([linkingPointName, linkingPoint]) => {
            if(linkingPoint.linkedMix) {
                f(linkingPointName, linkingPoint.linkedMix);
            }
        });
    }

    // 컨트롤러 연결
    addController(name : string): Controller {
        const linkedControllers = {} as LinkedControllers;
        this.runOnExistLinkingPoints((linkingPointName, linkedMix) => {
            linkedControllers[linkingPointName] = linkedMix.addController(name);
        });
        this.linkedControllerses[name] = linkedControllers;

        const controller = this.controllerLoaders[name].load(this.code, this.mixData.codeData, linkedControllers);

        this.controllers[name] = controller;
        return controller;
    }
    removeController(name : string) {
        this.runOnExistLinkingPoints((linkingPointName, linkedMix) => {
            linkedMix.removeController(name);
        });
        delete this.linkedControllerses[name];
        delete this.controllers[name];
    }
}