
import LinkingPoint from "./LinkingPoint";

export default interface LinkingPoints<D,T> {
    [name : string]: LinkingPoint<D,T>
}