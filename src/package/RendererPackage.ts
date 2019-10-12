import Renderer from "../element/Renderer";

interface RendererPackageBody {
    [name : string]: typeof Renderer
}

export default interface CompilerPackage {
    id: string
    version: string
    body: RendererPackageBody
    for_id: string
    for_version: string
};