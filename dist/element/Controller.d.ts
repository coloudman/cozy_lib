import Code from "./Code";
import Data from "@src/struct/Data";
import Context from "@src/structClass/Context";
import LinkingPointsManager from "@src/LinkingPoint/LinkingPointsManager";
export default abstract class Controller {
    code: Code;
    data: Data;
    context: Context;
    linkingPointsManager: LinkingPointsManager<Controller>;
    constructor(code: Code, data: Data, context: Context, linkingPointsManager: LinkingPointsManager<Controller>);
    getLinkingPoint(name: string): import("../LinkingPoint/LinkingPoint").default<Controller>;
    getLinked(name: string): Controller;
    abstract init(): any;
    abstract stop(): any;
}
