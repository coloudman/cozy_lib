
import Controller from "../Element/Controller";
import Package from "./Package";

export default interface ControllerPackage<T extends Controller<any, any>> extends Package<T> {
    for_id: string
    for_version: string
}