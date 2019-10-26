import Loader from "./ElementLoader";
import Code from "../Element/Code";
import CodePackage from "../Package/CodePackage";
import CodeData from "../struct/CodeData";
import Mix from "../Mix/Mix";
export default class CodeLoader extends Loader<CodePackage> {
    load(data: CodeData, mix: Mix): Code;
}
