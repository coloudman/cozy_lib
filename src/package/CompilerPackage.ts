import Compiler from "../Element/Compiler";

interface CompilerPackageBody {
    [name : string]: typeof Compiler
}

export default interface CompilerPackage {
    id: string
    version: string
    body: CompilerPackageBody
    for_id: string
    for_version: string
};