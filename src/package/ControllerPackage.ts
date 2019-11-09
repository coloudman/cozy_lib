
import Controller from "../Element/Controller";
import Package from "./Package";

export default interface ControllerPackage extends Package<Controller> {
    for_id: string
    for_version: string
}