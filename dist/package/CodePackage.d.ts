import Code from "../Element/Code";
import Package from "./Package";
import Mix from "../Mix/Mix";
export default interface CodePackage extends Package<Code> {
    body: {
        [name: string]: {
            new (data: object, mix: Mix): Code;
        };
    };
}
