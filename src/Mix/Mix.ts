
import Controller from "../Element/Controller";
import CodeLoader from "../Loader/CodeLoader";
import Code from "../Element/Code";

import LinkingPoint from "../structClass/LinkingPoint";

import MixData from "../struct/MixData";
import LinkedControllers from "@src/structClass/LinkedControllers";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import Context from "@src/structClass/Context";

type Controllers = {
    [name : string]: Controller
}

export default class Mix {
    /*
    Code와 그에 연결된 Controller들,
    하위에 연결되어 있는 Mix들을 관리합니다.

    하위에 연결되어 있는 Mix들과 자신은 모두 같은 Controller들을 사용합니다.
    */

    
    controllerLoaders: ControllerLoaders;
    codeLoader: CodeLoader;
    mixData: MixData;
    contexts: {
        [controllerName:string]:Context
    };

    code: Code;

    linkingPoints: {
        [linkingPointName: string] : LinkingPoint
    }

    controllers: Controllers

    //특정 타입 컨트롤러가 접근할 수 있는 링킹포인트에 있는 같은 타입의 컨트롤러들을 저장합니다. linkControllerses[컨트롤러 타입][링킹포인트 이름]
    linkedControllerses: {
        [controllerName: string] : LinkedControllers
    }

    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, mixData : MixData, contexts : {[controllerName:string]:Context}) {

        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.mixData = mixData;
        this.contexts = contexts;

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
        return new Mix(this.codeLoader, this.controllerLoaders, mixData, this.contexts);
    }

    // 연결점 관련

    addDefaultLinkingPoints(names : string[]) {
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
            linkingPointsData:mixData.linkingPointsData,
            controllerDatas:mixData.controllerDatas
        };

        const mix = this.loadMix(mixData);

        //기존에 있던 컨트롤러-링킹포인트 접근 오브젝트들에 이 링킹포인트 추가
        Object.entries(this.linkedControllerses).forEach(([controllerType, controllers]) => {
            controllers[name] = mix.addController(controllerType);
        });

        //Mix 로딩해서 등록, 이때 추가적인 리스너들이 호출됨
        this.linkingPoints[name].link(mix);
    }
    unlink(name : string) {
        delete this.linkingPoints[name];
        delete this.mixData.linkingPointsData[name];
    }

    //유틸, 모든 연결된 연결점에서 실행
    runOnExistLinkingPoints(f : (linkingPointName : string, linkedMix : Mix) => any) {
        Object.entries(this.linkingPoints).forEach(([linkingPointName, linkingPoint]) => {
            if(linkingPoint.linked) {
                f(linkingPointName, linkingPoint.linked);
            }
        });
    }

    // 컨트롤러 연결
    addController(name : string): Controller {
        //컨트롤러를 위한 하위 컨트롤러 연결점(linkedControllerses) 제작
        const linkedControllers = {} as LinkedControllers;
        this.runOnExistLinkingPoints((linkingPointName, linkedMix) => {
            linkedControllers[linkingPointName] = linkedMix.addController(name);
        });
        this.linkedControllerses[name] = linkedControllers;

        //컨트롤러의 데이터 없을시 제작
        const controllerData = this.mixData.controllerDatas[name] || (this.mixData.controllerDatas[name] = {});
        const controller = this.controllerLoaders[name].load(this.code, this.mixData.codeData, linkedControllers, controllerData, this.contexts[name]);

        this.controllers[name] = controller;
        return controller;
    }
    removeController(name : string, withData = false) {
        //하위 Mix도 컨트롤러 제거
        this.runOnExistLinkingPoints((linkingPointName, linkedMix) => {
            linkedMix.removeController(name);
        });

        //name 타입의 컨트롤러를 위한 하위 컨트롤러 저장 오브젝트 제거
        delete this.linkedControllerses[name];

        //정지 요청
        this.controllers[name].stop();
        delete this.controllers[name];

        //컨트롤러 데이터도 제거를 원할 시
        if(withData) {
            delete this.mixData.controllerDatas[name];
        }
    }
}
