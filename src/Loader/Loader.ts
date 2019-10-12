
import Package from "../Package/Package";

type Packages<T, PackageT extends Package<T>> = {
    [name:string]: PackageT
}


export default class Loader<T, PackageT extends Package<T>> {
    packages: Packages<T, PackageT>

    constructor(packages : Packages<T, PackageT>) {
        this.packages = packages;
    }
}