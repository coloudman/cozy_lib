
import Code from "../Element/Code";
import Package from "./Package";

import LinkingPointsData from "../struct/LinkingPointsData";
import CodeData from "../struct/CodeData";
import LinkingPoint from "@src/structClass/LinkingPoint";
import Mix from "../Mix/Mix";

type LinkingPoints = {
    [name : string]: LinkingPoint
}

export default interface CodePackage extends Package<Code> {
    body: {
        [name:string]: {
            new(data : object, mix : Mix): Code
        }
    }
}