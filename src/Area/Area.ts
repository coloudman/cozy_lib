import CodeLoader from "@src/Loader/CodeLoader";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import CodeData from "@src/struct/CodeData";
import Code from "../Element/Code";
import Controller from "@src/Element/Controller";

import EventEmitter from "wolfy87-eventemitter";
import Context from "@src/structClass/Context";


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
    controllerLoaders: ControllerLoaders;
    codes: Code[];
    controllerNames: string[];
    codeDatas: CodeData[];
    contexts: { [controllerName: string]: Context; };
    
    constructor(codeLoader : CodeLoader, controllerLoaders : ControllerLoaders, codeDatas : CodeData[], contexts : {[controllerName:string]:Context}) {
        super();

        this.codeLoader = codeLoader;
        this.controllerLoaders = controllerLoaders;
        this.contexts = contexts;
        
        this.codes = [];
        this.controllerNames = [];

        this.codeDatas = codeDatas;

        codeDatas.forEach(codeData => {
            this.addCode(codeData);
        });
    }

    addCode(codeData : CodeData) : Code {
        const code = this.codeLoader.load(this.controllerLoaders, codeData, this.contexts);
        this.controllerNames.forEach(controllerName => {
            code.addController(controllerName);
        });
        this.codes.push(code);
        //Data
        this.codeDatas.push(codeData);

        //event
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
}

export default Area;