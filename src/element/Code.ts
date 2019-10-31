


import LinkingPoints from "../structClass/LinkingPoints";
import Mix from "../Mix/Mix";
import EventEmitter from "wolfy87-eventemitter";



type Data = {
    [key:string]:any
};

declare interface Code {
    on(event : "dataChanged", listener : (oldData : Data, newData : Data) => void) : this
    on(event: string, listener: Function): this
    on(event: RegExp, listener: Function): this

    emit(event : "dataChanged", oldData : Data, newData : Data) : this
    emit(event : string, ...args : any): this
    emit(event : RegExp, ...args : any): this
}

abstract class Code extends EventEmitter {
    private data: Data //데이터는 맘대로 건들지 말고 대신 changeData 함수 써
    linkingPoints: LinkingPoints
    readonly addLinkingPoint: (name : string) => Mix;
    readonly addDefaultLinkingPoints: (name : string[]) => void;

    constructor(data : Data, mix : Mix) {
        super();
        this.data = data; //LINK(POINTER) data !//JSON.parse(JSON.stringify(data)); //deep JSON copy
        this.linkingPoints = mix.linkingPoints;
        this.addLinkingPoint = mix.addLinkingPoint.bind(mix);
        this.addDefaultLinkingPoints = mix.addDefaultLinkingPoints.bind(mix);
        
        this.init();
    }

    //만들다 보니 어째 리액트랑 비슷한 구조다. setState..

    protected changeData(f : (data : Data) => void) {
        const oldData = JSON.parse(JSON.stringify(this.data));
        f(this.data);

        this.emit("dataChanged",oldData,this.data);
    }

    protected getData() {
        return this.data;
    }

    abstract init(): any
};

export default Code;