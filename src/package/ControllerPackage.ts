
import Package from "./Package";

export default interface ControllerPackage<T> extends Package<T> {
    for_id: string
    for_version: string
}