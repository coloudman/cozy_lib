
import LinkingPoint from "./LinkingPoint";

export default interface LinkingPoints<T> {
    [name : string]: LinkingPoint<T>
}