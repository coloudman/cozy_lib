
import Loader from "./Loader";
import Code from "../Element/Code";
import CodePackage from "../Package/CodePackage";
import Data from "@src/struct/Data";

export default class CodeLoader extends Loader<Code, CodePackage> {

    load(data : Data) : Code {
        const foundPackage = Object.values(this.packages).find((package_ : PackageT) => {
            return data.packageId === package_.id && data.packageVersion === package_.version;
        });

        const Class = foundPackage.body[data.id];

        const instance = new Class(data.data, this.load.bind(this));
        return instance;
    }
}