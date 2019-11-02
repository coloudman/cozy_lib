
const { CodeLoader, ControllerLoader, Area, Context } = require("../dist/index");
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
            linkingPointsData:{},
            controllerDatas:{}
        }
    },
    controllerDatas:{}
};

const mixDatas = [];

class myCompilerContext extends Context {
    constructor(data) {
        super(data);
        if(this.data.space === undefined) {
            this.data.space = true;
        }
    }
    set space(space) {
        this.data.space = space;
        this.emit("spaceChanged", space);
    }
    get space() {
        return this.data.space;
    }
}

const contextData = {};
const context = new myCompilerContext(contextData);

//코드 클래스들을 엮어줌
const area = new Area(codeLoader, {
    compiler:compilerLoader
}, mixDatas, {
    compiler:context
});
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
    linkingPointsData:{},
    controllerDatas:{}
});

mix.linkingPoints.second.linked.link("first",{
    codeData:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number",
        data:{
            number:80
        }
    },
    linkingPointsData:{},
    controllerDatas:{}
});

mix.linkingPoints.second.linked.link("second",{
    codeData:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number",
        data:{
            number:40
        }
    },
    linkingPointsData:{},
    controllerDatas:{}
});

//컴파일 최고!
console.log("_________________");
console.log(JSON.stringify(mixDatas, null, 2));
console.log("_Yes spaces________________");
console.log(area.getController("compiler")[0].compile());
console.log(JSON.stringify(contextData, null, 2));
console.log("_No spaces________________");
context.space = false;
console.log(area.getController("compiler")[0].compile());
console.log(JSON.stringify(contextData, null, 2));