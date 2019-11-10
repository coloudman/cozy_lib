import Package from "../Package/Package";
import Packages from "../Package/Packages";
export default class Loader<PackageT extends Package<any>> {
    packages: Packages<PackageT>;
    constructor(packages: Packages<PackageT>);
}
