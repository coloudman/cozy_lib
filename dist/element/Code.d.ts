import LinkingPoints from "../structClass/LinkingPoints";
import Mix from "../Mix/Mix";
import EventEmitter from "wolfy87-eventemitter";
declare type Data = {
    [key: string]: any;
};
declare interface Code {
    on(event: "dataChanged", listener: (oldData: Data, newData: Data) => void): this;
    on(event: string, listener: Function): this;
    on(event: RegExp, listener: Function): this;
    emit(event: "dataChanged", oldData: Data, newData: Data): this;
    emit(event: string, ...args: any): this;
    emit(event: RegExp, ...args: any): this;
}
declare abstract class Code extends EventEmitter {
    private data;
    linkingPoints: LinkingPoints;
    readonly addLinkingPoint: (name: string) => Mix;
    readonly addDefaultLinkingPoints: (name: string[]) => void;
    constructor(data: Data, mix: Mix);
    protected changeData(f: (data: Data) => void): void;
    protected getData(): Data;
    abstract init(): any;
}
export default Code;
