import CodeData from "./CodeData";
import ContextData from "./ContextData";


export default interface AreaData {
    codeDatas:CodeData[]
    contextDatas:{
        [controllerName:string]:ContextData
    }
}