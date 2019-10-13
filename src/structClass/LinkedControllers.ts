import Controller from "../Element/Controller";


export default interface LinkedControllers<T extends Controller<any, any>> {
    [name : string]: T
}