
import Code from "../Element/Code";
import Package from "./Package";

import LinkingPoint from "@src/LinkingPoint/LinkingPoint";
import ControllerLoaders from "@src/structClass/ControllerLoaders";
import CodeData from "@src/struct/CodeData";
import Context from "@src/structClass/Context";
import CodeLoader from "@src/Loader/CodeLoader";

type LinkingPoints = {
    [name : string]: LinkingPoint<Code>
}

export default interface CodePackage extends Package<Code> {
    body: {
        [name:string]: {
            new(codeLoader:CodeLoader, controllerLoaders : ControllerLoaders, codeData : CodeData, contexts : {[controllerName:string]:Context}): Code
        }
    }
}