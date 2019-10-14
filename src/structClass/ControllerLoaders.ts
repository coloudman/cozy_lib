import ControllerLoader from "@src/Loader/ControllerLoader";

export default interface ControllerLoaders {
    [name : string]: ControllerLoader<any>
};