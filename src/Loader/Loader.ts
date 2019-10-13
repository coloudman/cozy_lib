
import Package from "../Package/Package";

type Packages<PackageT extends Package<any>> = {
    [name:string]: PackageT
}


export default class Loader<PackageT extends Package<any>> {
    packages: Packages<PackageT>

    constructor(packages : Packages<PackageT>) {
        this.packages = packages;
    }
}