import Code from "../element/Code";

interface CodePackageBody {
    [name : string]: typeof Code
}

export default interface CodePackage {
    id: string
    version: string
    body: CodePackageBody
};