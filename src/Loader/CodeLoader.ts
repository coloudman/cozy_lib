
import Loader from "./ElementLoader";
import Code from "../Element/Code";
import CodePackage from "../Package/CodePackage";
import CodeData from "../struct/CodeData";

import LinkingPoints from "@src/structClass/LinkingPoints";
import Mix from "../Mix/Mix";

export default class CodeLoader extends Loader<CodePackage> {

    load(data : CodeData, mix : Mix) : Code {
        const foundPackage = Object.values(this.packages).find((package_ : CodePackage) => {
            return data.packageId === package_.id && data.packageVersion === package_.version;
        });

        const Class = foundPackage.body[data.id];

        const instance = new Class(data.data, mix);
        return instance;
    }
}