
export default class CodeLoader {
    constructor(codePackages) {
        this.codePackages = codePackages;
    }

    loadCode(codeData) {
        const codePackage = Object.values(this.codePackages).find(codePackage => {
            return codeData.packageId === codePackage.id && codeData.packageVersion === codePackage.version;
        });
        if(!codePackage) {
            throw new Error("codePackage not found");
        }

        const Code = codePackage.body[codeData.id]
        if(!Code) {
            throw new Error("Code class not found");
        }

        const code = new Code(codeData.data, this.loadCode.bind(this));
        return code;
    }
}