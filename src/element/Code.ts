


import LinkingPoints from "../LinkingPoint/LinkingPoints";
import Data from "../struct/Data";
import EventEmitter from "wolfy87-eventemitter";
import LinkingPointsManager from "../LinkingPoint/LinkingPointsManager";
import ControllerLoaders from "../structClass/ControllerLoaders";
import CodeLoader from "../Loader/CodeLoader";
import CodeData from "../struct/CodeData";
import Controller from "./Controller";
import Context from "../structClass/Context";
import LinkingPoint from "@src/LinkingPoint/LinkingPoint";

abstract class Code {
    private codeLinkingPointsManager: LinkingPointsManager<Code>
    private controllerLinkingPointsManagers: {
        [controllerName : string]: LinkingPointsManager<Controller>
    };

    public abstract init(): any
    /*
    자신과 그에 연결된 Controller들을 관리할 수 있습니다.
    자식 Code는 늘 부모와 같은 Controller들을 가집니다.
    */

    
    controllerLoaders: ControllerLoaders;
    codeLoader: CodeLoader;
    codeData: CodeData;
    contexts: {
        [controllerName:string]:Context
    };

    controllers: {
        [name : string]: Controller
    }

    data: any;

    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, codeData : CodeData, contexts : {[controllerName:string]:Context}) {
        //this는 CodeLoader로부터 로드된 / 또는 그냥 클래스 입니다.

        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.codeData = codeData;
        this.contexts = contexts;
        this.controllers = {};

        this.codeLinkingPointsManager = new LinkingPointsManager<Code>();
        this.controllerLinkingPointsManagers = {};

        this.data = codeData.data;

        // 연결점 제작
        Object.entries(codeData.linkingPointsData).forEach(([name, childCodeData])=>{
            this.codeLinkingPointsManager.addLinkingPoint(name);
            this.codeLinkingPointsManager.link(name, this.codeLoader.load(controllerLoaders, childCodeData, contexts));
        });


        this.init();

        /*
        참고:
        Code의 Constructor에서는 Controller들을 로드하지 않습니다.
        Controller들은 추후에 addController / removeController를 통해 추가 / 삭제 할 수 있습니다.
        */
    }


    //유틸, 모든 연결된 Code 연결점에서 실행
    
    runOnExistLinkingPoints(f : (linkingPointName : string, linked : Code) => any) {
        Object.entries(this.codeLinkingPointsManager.linkingPoints).forEach(([linkingPointName, linkingPoint]) => {
            if(linkingPoint.linked) {
                f(linkingPointName, linkingPoint.linked);
            }
        });
    }

    // 컨트롤러 관련
    addController(name : string): Controller {
        //컨트롤러를 위한 연결점 관리자 생성
        const controllerLinkingPointsManager = this.controllerLinkingPointsManagers[name] = new LinkingPointsManager<Controller>();
        Object.entries(this.codeLinkingPointsManager.linkingPoints).forEach(([linkingPointName, linkingPoint]) => {
            controllerLinkingPointsManager.addLinkingPoint(linkingPointName);
            if(linkingPoint.linked) {
                controllerLinkingPointsManager.link(linkingPointName, linkingPoint.linked.addController(name));
            }
        });

        //컨트롤러의 데이터 없을시 제작
        const controllerData = this.codeData.controllerDatas[name] || (this.codeData.controllerDatas[name] = {});
        const controller = this.controllerLoaders[name].load(this, this.codeData.iD, controllerData, this.contexts[name], controllerLinkingPointsManager);

        this.controllers[name] = controller;
        return controller;
    }
    removeController(name : string, withData = false) {
        //하위 Mix도 컨트롤러 제거
        this.runOnExistLinkingPoints((linkingPointName, linked) => {
            linked.removeController(name);
        });

        //컨트롤러를 위한 연결점 관리자 삭제
        delete this.controllerLinkingPointsManagers[name];

        //컨트롤러에 정지 요청, 삭제
        this.controllers[name].stop();
        delete this.controllers[name];

        //컨트롤러 데이터도 제거를 원할 시
        if(withData) {
            delete this.codeData.controllerDatas[name];
        }
    }

    //링킹포인트(연결점) 관련
    //Code, Controller들에게 모두 링킹포인트 추가
    addLinkingPoint(name : string) {
        const linkingPoint = this.codeLinkingPointsManager.addLinkingPoint(name);
        Object.values(this.controllerLinkingPointsManagers).forEach(controllerLinkingPointsManager => {
            controllerLinkingPointsManager.addLinkingPoint(name);
        });

        return linkingPoint;
    }
    removeLinkingPoint(name : string) {
        this.codeLinkingPointsManager.removeLinkingPoint(name);
        Object.values(this.controllerLinkingPointsManagers).forEach(controllerLinkingPointsManager => {
            controllerLinkingPointsManager.removeLinkingPoint(name);
        });
    }

    addDefaultLinkingPoints(names : string[]) {
        names.forEach(name => {
            if(!this.codeLinkingPointsManager.linkingPoints[name]) {
                this.addLinkingPoint(name);
            }
        });
    }

    //링크!
    link(name : string, codeData : CodeData) {
        const code = this.codeLoader.load(this.controllerLoaders, codeData, this.contexts);
        this.codeLinkingPointsManager.link(name, code);
        //모든 controllerLinkingPointsManager 들에 대해 반복, 연결점 이름에다가 자식 code의 controller를 저장
        Object.entries(this.controllerLinkingPointsManagers).forEach(([controllerName, controllerLinkingPointsManager]) => {
            controllerLinkingPointsManager.link(name, code.addController(controllerName));
        });
        //데이터
        this.codeData.linkingPointsData[name] = codeData;
    }
    unlink(name : string) {
        this.codeLinkingPointsManager.unlink(name);

        Object.values(this.controllerLinkingPointsManagers).forEach(controllerLinkingPointsManager => {
            controllerLinkingPointsManager.unlink(name);
        });
        //데이터
        delete this.codeData.linkingPointsData[name];
    }


    //그냥 그런거
    getLinkingPoint(name : string) : LinkingPoint<Code> {
        return this.codeLinkingPointsManager.getLinkingPoint(name);
    }
    getLinked(name : string) {
        return this.codeLinkingPointsManager.getLinked(name);
    }
};

export default Code;