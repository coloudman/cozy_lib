
import Code from "../Element/Code";
import Package from "./Package";

import LinkingPoint from "../LinkingPoint/LinkingPoint";
import ControllerLoaders from "../structClass/ControllerLoaders";
import CodeData from "../struct/CodeData";
import Context from "../element/Context";
import CodeLoader from "../Loader/CodeLoader";
import { Data } from "..";

export default interface ContextPackage {
    id: string
    version: string
    body: {
        new(data : Data): Context
    }
}