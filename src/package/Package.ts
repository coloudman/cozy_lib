

export default interface Package<T> {
    id: string
    version: string
    body: {
        [name:string]: {
            new(...args:any): T
        }
    }
};