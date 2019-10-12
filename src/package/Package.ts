
interface PackageBody<T> {
    [name : string]: { new():T }
}

export default interface Package<T> {
    id: string
    version: string
    body: PackageBody<T>
};