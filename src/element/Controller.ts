import Code from "./Code";

import Data from "@src/struct/Data";
import Context from "@src/structClass/Context";
import LinkingPointsManager from "@src/LinkingPoint/LinkingPointsManager";

export default abstract class Controller {
    code: Code
    data: Data
    context: Context
    linkingPointsManager: LinkingPointsManager<Controller>;

    constructor(code : Code, data:Data, context:Context, linkingPointsManager : LinkingPointsManager<Controller>) {

        this.code = code;
        this.linkingPointsManager = linkingPointsManager;
        this.data = data;
        this.context = context;

        this.init();
    }

    getLinkingPoint(name : string) {
        return this.linkingPointsManager.getLinkingPoint(name);
    }
    getLinked(name : string) {
        return this.linkingPointsManager.getLinked(name);
    }

    abstract init():any
    abstract stop():any
};