
import LinkingPoint from "./LinkingPoint";

export default interface LinkingPoints<D> {
    [name : string]: LinkingPoint<D>
}