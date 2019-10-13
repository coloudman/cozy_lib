

import Data from "@src/struct/Data";

export default abstract class Element<DataT extends Data, ElementT extends Element<DataT, ElementT>> {
    data: object;

    constructor(data : object) {
        this.data = data;
    }
}