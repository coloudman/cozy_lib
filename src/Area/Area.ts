import CodeLoader from "../Loader/CodeLoader";
import ControllerLoaders from "../structClass/ControllerLoaders";
import CodeData from "../struct/CodeData";
import Code from "../Element/Code";
import Controller from "../Element/Controller";

import EventEmitter from "wolfy87-eventemitter";
import Context from "../element/Context";
import Composers from "../structClass/Composers";
import AreaData from "../struct/AreaData";
import ContextLoader from "../Loader/ContextLoader";
import ContextData from "../struct/ContextData";
import ComposerData from "../struct/ComposerData";
import Composer from "../element/Composer";
import ComposerLoader from "../Loader/ComposerLoader";


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
    areaData: any;
    contextLoaders: { [controllerName: string]: ContextLoader; };
    composerLoaders: any;

    exportAreaData():AreaData {
        const contextDatas : {[controllerName:string]:ContextData}= {};
        Object.entries(this.contexts).forEach(([controllerName, context]) => {
            contextDatas[controllerName] = context.exportContextData();
        });
        return {
            codeDatas:this.codes.map(code => {
                return code.exportCodeData();
            }),
            contextDatas
        }
    }
    
    constructor(codeLoader : CodeLoader, areaData : AreaData, contextLoaders : {[controllerName:string]:ContextLoader}, composerLoaders : {[controllerName:string]:ComposerLoader}) {
        super();

        this.areaData = areaData;

        this.codeLoader = codeLoader;

        //콘텍스트가 있으면 모두다 로드함
        this.contextLoaders = contextLoaders;
        this.contexts = {};
        Object.entries(contextLoaders).forEach(([controllerName, contextLoader]) => {
        });

        //컴포저가 있으면 모두다 로드함
        this.composerLoaders = composerLoaders;
        this.composers = {};


        this.codes = [];
        this.controllerNames = [];

        this.codeDatas = this.areaData.codeDatas;

        this.codeDatas.forEach(codeData => {
            this.addCode(this.makeCode(codeData));
        });
    }


    /* Code */
    makeCode(codeData : CodeData) {
        return this.codeLoader.load(codeData, this.contexts);
    }

    addCode(code : Code) : Code {
        this.controllerNames.forEach(controllerName => {
            code.addController(controllerName);
        });
        this.codes.push(code);
        //Data
        this.codeDatas.push(code.codeData);

        //event
        const _this = this;
        code.on("unlink", function onUnlink() {
            _this.removeCode(code);
            code.removeListener("unlink", onUnlink);
        });
        this.emit("codeAdded", code);
        return code;
    }
    addCodeFromCodeData(codeData : CodeData) {
        return this.addCode(this.makeCode(codeData));
    }
    removeCode(code : Code) {
        const codeIndex = this.codes.indexOf(code);
        this.codes.splice(codeIndex, 1);
        //Data
        this.codeDatas.splice(codeIndex, 1);

        //event
        this.emit("codeRemoved", code);
    }

    /* Controller */
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

    /* Context 관련 */
    makeContext(controllerName : string, contextData : ContextData) {
        return this.contextLoaders[controllerName].load(contextData);
    }
    addContext(controllerName : string, context : Context) {
        this.contexts[controllerName] = context;
        return context;
    }
    addContextFromContextData(controllerName : string, contextData : ContextData) {
        return this.contexts[controllerName] = this.makeContext(controllerName, contextData);
    }


    /* Compose 관련 */
    makeComposer(controllerName : string, composerData : ComposerData) {
        return this.composerLoaders[controllerName].load(composerData);
    }
    addComposer(controllerName : string, composer : Composer) {
        this.composers[controllerName] = composer;
        return composer;
    }
    addComposerFromComposerData(controllerName : string, composerData : ComposerData) {
        return this.composers[controllerName] = this.makeComposer(controllerName, composerData);
    }

    compose(controllerName : string) {
        const controllers = this.codes.map(code => {
            return code.getController(controllerName);
        });
        return this.composers[controllerName].compose(controllers);
    }
}

export default Area;