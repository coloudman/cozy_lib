


import LinkingPoints from "../structClass/LinkingPoints";
import Mix from "../Mix/Mix";
import Data from "../struct/Data";
import EventEmitter from "wolfy87-eventemitter";

abstract class Code extends EventEmitter {
    protected linkingPoints: LinkingPoints
    protected data: Data;
    protected readonly addLinkingPoint: (name : string) => Mix;
    protected readonly addDefaultLinkingPoints: (name : string[]) => void;

    constructor(data : Data, mix : Mix) {
        super();
        this.data = data; //LINK(POINTER) data !//JSON.parse(JSON.stringify(data)); //deep JSON copy
        this.linkingPoints = mix.linkingPoints;
        this.addLinkingPoint = mix.addLinkingPoint.bind(mix);
        this.addDefaultLinkingPoints = mix.addDefaultLinkingPoints.bind(mix);
        
        this.init();
    }

    public abstract init(): any
};

export default Code;