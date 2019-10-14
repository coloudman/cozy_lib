
const { Mix, CodeLoader, CompilerLoader } = require("../dist/index");
const testPackage = require("./testPackage");
const testCompilerPackage = require("./testCompilerPackage");

//코드 클래스를 보관함
const codePackages = {
    testPackage
};
const compilerPackages = {
    testCompilerPackage
};

//코드 클래스를 불러옴
const codeLoader = new CodeLoader(codePackages);
const compilerLoader = new CompilerLoader(compilerPackages);

//코드 데이터. 순수 JSON임
const mixData = {
    codeData:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Plus",
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
const mix = new Mix(codeLoader, {
    compiler:compilerLoader
}, mixData);

console.log(mix);


console.log("----링크함----")

//링크 해봄
mix.linkingPoints.second.link(new Mix(codeLoader, {
    compiler:compilerLoader
}, {
    codeData:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number",
        data:{
            number:166
        }
    },
    linkingPointsData:{}
}))

console.log(mix);


//컴파일 최고!
console.log(mix.controllers.compiler.compile());

console.log(JSON.stringify(mixData, null, 2));