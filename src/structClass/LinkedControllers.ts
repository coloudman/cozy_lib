import Controller from "../Element/Controller";


export default interface LinkedControllers<T extends Controller> {
    [name : string]: T
}