
import Data from "@src/struct/Data"

interface PackageBody<T> {
    [name : string]: { new(data : object, load : (data : Data) => T, ...any:any):T }
}

export default interface Package<T> {
    id: string
    version: string
    body: PackageBody<T>
};