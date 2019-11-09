import Package from "./Package"

export default interface Packages<PackageT extends Package<any>> {
    [name:string]: PackageT
}