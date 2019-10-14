
import CodeData from "./CodeData";
import LinkingPointsData from "./LinkingPointsData";

export default interface MixData {
    codeData: CodeData
    linkingPointsData: LinkingPointsData
}


/*

type casting test

import CompilerData from "./CompilerData";

function a(m : MixedData) {
    return m;
}

a({
    codeData:{},
    controllerDatas:{
        ang: {
            packageId:"t",
            packageVersion:"ddd",
            id:"ANG",
            linkingPointsData:{

            },
            data:{},
            c:"HAHA"
        } as CompilerData
    }
})

good!

*/