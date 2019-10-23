
const { CodeLoader, ControllerLoader, Area } = require("../dist/index");
const testPackage = require("./packages/MATHCode");
const testCompilerPackage = require("./packages/MATHCompilerJS");


//코드 클래스를 보관함
const codePackages = {
    testPackage
};

const compilerPackages = {
    testCompilerPackage
};


//코드 클래스를 불러옴
const codeLoader = new CodeLoader(codePackages);

const compilerLoader = new ControllerLoader(compilerPackages);



//코드 데이터. 순수 JSON임
const mixData = {
    codeData:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Add",
        data:{}
    },
    linkingPointsData:{
        first:{
            codeData:{
                packageId:"MATH",
                packageVersion:"1",
                id:"Number",
                data:{
                    number:8
                }
            },
            linkingPointsData:{}
        }
    }
};

//코드 클래스들을 엮어줌
const area = new Area(codeLoader, {
    compiler:compilerLoader
},[]);
area.addController("compiler");

const mix = area.addMix(mixData);

//링크 해봄
mix.link("second",{
    codeData:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Subtract",
        data:{}
    },
    linkingPointsData:{}
});

mix.linkingPoints.second.linkedMix.link("first",{
    codeData:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number",
        data:{
            number:80
        }
    },
    linkingPointsData:{}
});

mix.linkingPoints.second.linkedMix.link("second",{
    codeData:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number",
        data:{
            number:40
        }
    },
    linkingPointsData:{}
})

//컴파일 최고!
console.log(area.getController("compiler")[0].compile());

console.log(JSON.stringify(mixData, null, 2));