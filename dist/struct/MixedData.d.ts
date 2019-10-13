import CodeData from "./CodeData";
import ControllerData from "./ControllerData";
export default interface MixedData {
    codeData: CodeData;
    controllerDatas: {
        [name: string]: ControllerData<any>;
    };
}
