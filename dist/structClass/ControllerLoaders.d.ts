import ControllerLoader from "../Loader/ControllerLoader";
export default interface ControllerLoaders {
    [name: string]: ControllerLoader;
}
