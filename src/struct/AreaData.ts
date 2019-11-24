import CodeData from "./CodeData";
import ContextData from "./ContextData";
import ComposerData from "./ComposerData";


export default interface AreaData {
    codeDatas:CodeData[]
    contextDatas:{
        [controllerName:string]:ContextData
    }
    composerDatas:{
        [controllerName:string]:ComposerData
    }
}