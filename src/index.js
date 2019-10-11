

/*
typedef, function...
*/


/**
 * Load Code from codeData object(json)
 * @function loadCode
 * @param {Object} codeData
 * @return {Code}
*/

/**
 * Data of Code
 * @typedef {Object} CodeData
 * @property {string} packageId
 * @property {string} packageVersion
 * @property {string} id
 * @property {Object} data
 * @property {Object} linkedBlockData
 */

 import CodePackage from "./package/CodePackage"
 import RendererPackage from "./package/RendererPackage"
 import CompilerPackage from "./package/CompilerPackage"

 import Code from "./element/Code"
 import Renderer from "./element/Renderer"
 import Compiler from "./element/Compiler"

export {
    CodePackage,
    RendererPackage,
    CompilerPackage,
    Code, 
    Renderer,  
    Compiler
};