import LinkingPoints from "../structClass/LinkingPoints";
import Mix from "../Mix/Mix";
import Data from "../struct/Data";
import EventEmitter from "wolfy87-eventemitter";
declare abstract class Code extends EventEmitter {
    protected linkingPoints: LinkingPoints;
    protected data: Data;
    protected readonly addLinkingPoint: (name: string) => Mix;
    protected readonly addDefaultLinkingPoints: (name: string[]) => void;
    constructor(data: Data, mix: Mix);
    abstract init(): any;
}
export default Code;
