import Element from "../Element/Element";
export default interface Package<T extends Element<any, any>> {
    id: string;
    version: string;
    body: {
        [name: string]: {
            new (...args: any): T;
        };
    };
}
