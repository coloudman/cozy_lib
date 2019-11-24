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
    codeDatas: CodeData[];
    contexts: { [controllerName: string]: Context; };
    composers: Composers;
    areaData: AreaData;
    contextLoaders: { [controllerName: string]: ContextLoader; };
    composerLoaders: any;
    controllerNames : string[]

    exportAreaData():AreaData {
        const contextDatas : {[controllerName:string]:ContextData}= {};
        Object.entries(this.contexts).forEach(([controllerName, context]) => {
            contextDatas[controllerName] = context.exportContextData();
        });
        const composerDatas : {[controllerName:string]:ComposerData}= {};
        Object.entries(this.composers).forEach(([controllerName, composer]) => {
            composerDatas[controllerName] = composer.exportComposerData();
        });
        return {
            codeDatas:this.codes.map(code => {
                return code.exportCodeData();
            }),
            contextDatas,
            composerDatas
        }
    }
    
    constructor(codeLoader : CodeLoader, areaData : AreaData, contextLoaders : {[controllerName:string]:ContextLoader}, composerLoaders : {[controllerName:string]:ComposerLoader}, defaultContexts : string[] = [], defaultComposers : string[] = []) {
        super();

        this.areaData = areaData;

        this.codeLoader = codeLoader;

        //콘텍스트가 있으면 모두다 로드함
        this.contextLoaders = contextLoaders;
        this.contexts = {};
        defaultContexts.forEach(controllerName => {
            this.addContext(controllerName);
        });

        //컴포저가 있으면 모두다 로드함
        this.composerLoaders = composerLoaders;
        this.composers = {};
        defaultComposers.forEach(controllerName => {
            this.addComposer(controllerName);
        });


        this.codes = [];

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
    makeContext(controllerName : string) {
        return this.contextLoaders[controllerName].load(this.areaData.contextDatas[controllerName]);
    }
    addContext(controllerName : string) {
        return this.contexts[controllerName] = this.makeContext(controllerName);
    }


    /* Compose 관련 */
    makeComposer(controllerName : string) {
        return this.composerLoaders[controllerName].load(this.areaData.composerDatas[controllerName]);
    }
    addComposer(controllerName : string) {
        return this.composers[controllerName] = this.makeComposer(controllerName);
    }


    compose(controllerName : string, methodName : string) {
        const controllers = this.codes.map(code => {
            return code.getController(controllerName);
        });
        return (<any>this.composers[controllerName])[methodName](controllers);
    }
}

export default Area;