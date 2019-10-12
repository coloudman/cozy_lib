
import Package from "../Package/Package";
import Data from "@src/struct/Data";

type Packages<T> = {
    [name:string]: Package<T>
}


export default class Loader<T> {
    packages: Packages<T>

    constructor(packages : Packages<T>) {
        this.packages = packages;
    }

    load(data : Data) {
        const codePackage = Object.values(this.codePackages).find(codePackage => {
            return codeData.packageId === codePackage.id && codeData.packageVersion === codePackage.version;
        });
        if(!codePackage) {
            throw new Error("codePackage not found");
        }

        const Code = codePackage.body[codeData.id]
        if(!Code) {
            throw new Error("Code class not found");
        }

        const code = new Code(codeData.data, this.loadCode.bind(this));
        return code;
    }
}