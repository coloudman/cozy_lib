import CodeLoader from "../Loader/CodeLoader";
import ControllerLoaders from "../structClass/ControllerLoaders";
import CodeData from "../struct/CodeData";
import Code from "../Element/Code";
import Controller from "../Element/Controller";

import EventEmitter from "wolfy87-eventemitter";
import Context from "../structClass/Context";
import Composers from "../structClass/Composers";


declare interface Area {
    on(event : "codeAdded" | "codeRemoved", listener : (code : Code) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "codeAdded" | "codeRemoved", code : Code) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

class Area extends EventEmitter {
    /*
    같은 Loader들을 가지는 Mix들의 집합 존재 공간
    */

    codeLoader: CodeLoader;
    codes: Code[];
    controllerNames: string[];
    codeDatas: CodeData[];
    contexts: { [controllerName: string]: Context; };
    composers: Composers;
    
    constructor(codeLoader : CodeLoader, codeDatas : CodeData[], contexts : {[controllerName:string]:Context}) {
        super();

        this.codeLoader = codeLoader;
        this.contexts = contexts;
        
        this.codes = [];
        this.controllerNames = [];

        this.codeDatas = codeDatas;

        codeDatas.forEach(codeData => {
            this.addCode(codeData);
        });
    }

    addCode(codeData : CodeData) : Code {
        const code = this.codeLoader.load(codeData);
        this.controllerNames.forEach(controllerName => {
            code.addController(controllerName);
        });
        this.codes.push(code);
        //Data
        this.codeDatas.push(codeData);

        //event
        code.on("stopped", () => {
            //코드가 쥬것어.. 흑흑.. 시체 처리 하자
            this.removeCode(code);
        });
        this.emit("codeAdded", code);
        return code;
    }
    removeCode(code : Code) {
        const codeIndex = this.codes.indexOf(code);
        this.codes.splice(codeIndex, 1);
        //Data
        this.codeDatas.splice(codeIndex, 1);

        //event
        this.emit("codeRemoved", code);
    }

    getController(controllerName : string) : Controller[] {
        const controllers : Controller[] = [];
        this.codes.forEach(code => {
           controllers.push(code.controllers[controllerName]);
        });
        return controllers;
    }

    addController(controllerName : string) {
        this.codes.forEach(code => {
            code.addController(controllerName);
        });
        this.controllerNames.push(controllerName);
    }



    /* Compose 관련 */

    setComposers(composers : Composers) {
        this.composers = composers;
    }
    getComposers() {
        return this.composers;
    }

    compose(controllerName : string) {
        const controllers = this.codes.map(code => {
            return code.getController(controllerName);
        });
        return this.composers[controllerName](controllers, this.contexts[controllerName]);
    }
}

export default Area;