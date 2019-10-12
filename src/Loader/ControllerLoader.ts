
import Loader from "./Loader";
import Code from "../Element/Code";
import Controller from "../Element/Controller";
import ControllerPackage from "../Package/ControllerPackage";

import Data from "@src/struct/Data";

export default class ControllerLoader<T extends Controller> extends Loader<Controller, ControllerPackage<T>> {
    load(data : Data, code : Code) : T {
        
        const foundPackage = Object.values(this.packages).find((package_ : ControllerPackage<T>) => {
            return data.packageId === package_.id && data.packageVersion === package_.version;
        });

        const Class = foundPackage.body[data.id];

        const instance = new Class(data.data, this.load.bind(this), code);
        return instance;
    }
}