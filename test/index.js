
const { CodeLoader, ControllerLoader, Area, Context } = require("../dist/index");
const testPackage = require("./mathPackages/MATHCode");
const testCompilerPackage = require("./mathPackages/MATHCompilerJS");


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


//코드 클래스를 보관함
const codePackages = {
    testPackage
};

const compilerPackages = {
    testCompilerPackage
};


//로더로더
const compilerLoaders = {
    compiler:new ControllerLoader(compilerPackages)
};

//콘텍스트
const contextData = {};
const contexts = {
    compiler:new myCompilerContext(contextData)
};

//코드로더가 마지막에 뙇
const codeLoader = new CodeLoader(codePackages, compilerLoaders, contexts);


//코드 데이터. 순수 JSON임
const codeData = {
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Add"
    },
    linkingPointsData:{
        first:{
            iD:{
                packageId:"MATH",
                packageVersion:"1",
                id:"Number"
            },
            data:{
                number:8
            },
            linkingPointsData:{},
            controllerDatas:{}
        }
    },
    data:{},
    controllerDatas:{}
};

const codeDatas = [];



//코드 클래스들을 엮어줌
const area = new Area(codeLoader, codeDatas, contexts);
area.addController("compiler");

const code = area.addCode(codeData);

//링크 해봄
code.link("second",{
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Subtract"
    },
    data:{},
    linkingPointsData:{},
    controllerDatas:{}
});

code.getLinkingPoint("second").linked.link("first",{
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number"
    },
    data:{
        number:80
    },
    linkingPointsData:{},
    controllerDatas:{}
});

code.getLinkingPoint("second").linked.link("second",{
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number"
    },
    data:{
        number:40
    },
    linkingPointsData:{},
    controllerDatas:{}
});


//컴파일
console.log("_________________");
console.log(JSON.stringify(codeDatas, null, 2));
console.log("_Yes spaces________________");
contexts.compiler.space = true;
console.log(area.getController("compiler")[0].compile());
console.log(JSON.stringify(contextData, null, 2));
console.log("_No spaces________________");
contexts.compiler.space = false;
console.log(area.getController("compiler")[0].compile());
console.log(JSON.stringify(contextData, null, 2));


//뗐다 붙였다
code.unlink("first");
code.link("first", {
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Power"
    },
    data:{},
    linkingPointsData:{},
    controllerDatas:{}
});
code.getLinked("first").link("first", {
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number"
    },
    data:{
        number:2
    },
    linkingPointsData:{},
    controllerDatas:{}
});
code.getLinked("first").link("second", {
    iD:{
        packageId:"MATH",
        packageVersion:"1",
        id:"Number"
    },
    data:{
        number:50
    },
    linkingPointsData:{},
    controllerDatas:{}
});

//컴파일
console.log("_________________");
console.log(JSON.stringify(codeDatas, null, 2));
console.log("_Yes spaces________________");
contexts.compiler.space = true;
console.log(area.getController("compiler")[0].compile());
console.log(JSON.stringify(contextData, null, 2));
console.log("_No spaces________________");
contexts.compiler.space = false;
console.log(area.getController("compiler")[0].compile());
console.log(JSON.stringify(contextData, null, 2));
