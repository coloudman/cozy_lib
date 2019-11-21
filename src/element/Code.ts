


import ControllerLoaders from "../structClass/ControllerLoaders";
import CodeLoader from "../Loader/CodeLoader";
import CodeData from "../struct/CodeData";
import Controller from "./Controller";
import Context from "../structClass/Context";
import CodeLinkingPointsManager from "../LinkingPoint/CodeLinkingPointsManager";
import ControllerLinkingPointsManager from "../LinkingPoint/ControllerLinkingPointsManager";
import EventEmitter from "wolfy87-eventemitter";

declare interface Code {
    on(event : "stopped", listener : () => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "stopped") : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class Code extends EventEmitter {
    codeLinkingPointsManager: CodeLinkingPointsManager
    private controllerLinkingPointsManagers: {
        [controllerName : string]: ControllerLinkingPointsManager
    };

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
        super();

        this.codeData = codeData;

        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.contexts = contexts;

        this.codeLinkingPointsManager = new CodeLinkingPointsManager(codeLoader);
        this.controllerLinkingPointsManagers = {};

        this.controllers = {};

        //얘도 좀 편하라고 만든거..
        this.data = codeData.data;

        /*
        링킹포인트 리스너(기능.)
        기능 연결은 뭔가 하기 전에 이루어져야 함.
        ex) 자식 코드들 제작
        */
        this.codeLinkingPointsManager.on("added", (linkingPointName, linkingPoint) => {//링킹포인트가 추가됨
            linkingPoint
            .on("linked", (code, codeData) => {//링킹포인트에 코드가 연결됬을 때
                //모든 컨트롤러들의 연결점. 링킹포인트 이름에 자식 code의 controller를 저장
                Object.entries(this.controllerLinkingPointsManagers).forEach(([controllerName, controllerLinkingPointsManager]) => {
                    const a = code.addController(controllerName);
                    controllerLinkingPointsManager.link(linkingPointName, a);
                });
                //데이터
                this.codeData.linkingPointsData[linkingPointName] = codeData;


                //추가!! "자식이" 부모랑 끊기를 원할 때(스탑됬을 때), 그 연결점에서 연결을 끊습니다.
                code.on("stopped", ()=>{
                    this.unlink(linkingPointName);
                });
            })
            .on("unlinked", () => {
                Object.values(this.controllerLinkingPointsManagers).forEach(controllerLinkingPointsManager => {
                    controllerLinkingPointsManager.unlink(linkingPointName);
                });
                //데이터
                delete this.codeData.linkingPointsData[linkingPointName];
            });

            //컨트롤러들에도 링킹포인트 추가
            Object.values(this.controllerLinkingPointsManagers).forEach(controllerLinkingPointsManager => {
                controllerLinkingPointsManager.addLinkingPoint(linkingPointName);
            });
        });
        this.codeLinkingPointsManager.on("removed", linkingPointName => {
            //어차피 링킹포인트가 지워질 때, 알아서 리스너도 삭제되므로 removeListener는 할 필요 없다.
            //컨트롤러들에서 링킹포인트 삭제
            Object.values(this.controllerLinkingPointsManagers).forEach(controllerLinkingPointsManager => {
                controllerLinkingPointsManager.removeLinkingPoint(linkingPointName);
            });
        });



        // 자식 코드들 제작
        Object.entries(codeData.linkingPointsData).forEach(([name, childCodeData])=>{
            this.addLinkingPoint(name);
            this.link(name, childCodeData);
        });


        /*
        Code의 Constructor에서는 Controller들을 로드하지 않습니다.
        Controller들은 추후에 addController / removeController를 통해 추가 / 삭제 할 수 있습니다.
        */




    }


    //유틸, 모든 연결된 Code 연결점에서 실행
    
    runOnExistLinkingPoints(f : (linkingPointName : string, linked : Code) => any) {
        Object.entries(this.codeLinkingPointsManager.getLinkingPoints()).forEach(([linkingPointName, linkingPoint]) => {
            if(linkingPoint.linked) {
                f(linkingPointName, linkingPoint.linked);
            }
        });
    }

    // 컨트롤러 관련
    addController(name : string): Controller {
        //컨트롤러를 위한 연결점 관리자 생성
        const controllerLinkingPointsManager = this.controllerLinkingPointsManagers[name] = new ControllerLinkingPointsManager();
        Object.entries(this.codeLinkingPointsManager.linkingPoints).forEach(([linkingPointName, linkingPoint]) => {
            controllerLinkingPointsManager.addLinkingPoint(linkingPointName);
            if(linkingPoint.linked) {
                controllerLinkingPointsManager.link(linkingPointName, linkingPoint.linked.addController(name));
            }
        });

        //컨트롤러의 데이터 없을시 제작
        const controllerData = this.codeData.controllerDatas[name] || (this.codeData.controllerDatas[name] = {});
        const controller = this.controllerLoaders[name].load({
            code:this,
            iD:this.codeData.iD,
            data:controllerData, 
            context:this.contexts[name], 
            linkingPointsManager: controllerLinkingPointsManager
        });

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
    getController(name : string) {
        return this.controllers[name];
    }


    /*
    편하게 쓸 수 있게 여러(주로 LinkingPoint) 메서드를 꾹꾹 눌러 담은 함수들
    */

    addLinkingPoint(name : string) {
        return this.codeLinkingPointsManager.addLinkingPoint(name);
    }
    removeLinkingPoint(name : string) {
        return this.codeLinkingPointsManager.removeLinkingPoint(name);
    }

    addDefaultLinkingPoints(names : string[]) { //특정 링킹포인트들을 무조건 존재하게 만듭니다.(없을시 생성)
        names.forEach(name => {
            if(!this.codeLinkingPointsManager.getLinkingPoint(name)) {
                this.addLinkingPoint(name);
            }
        });
    }

    link(name : string, codeData : CodeData) {
        return this.codeLinkingPointsManager.link(name, codeData);
    }
    unlink(name : string) {
        return this.codeLinkingPointsManager.unlink(name);
    }

    getLinkingPoints() {
        return this.codeLinkingPointsManager.linkingPoints;
    }
    getLinkingPoint(name : string) {
        return this.codeLinkingPointsManager.getLinkingPoint(name);
    }
    getLinked(name : string) {
        return this.codeLinkingPointsManager.getLinked(name);
    }


    //stop, 정지 관련
    stop() {
        //컨트롤러들을 없애고, 자동적으로 그들은 stop됩니다.
        Object.keys(this.controllers).forEach(controllerName => {
            this.removeController(controllerName);
        });
        //스탑 이벤트
        this.emit("stopped");
    }
};

export default Code;