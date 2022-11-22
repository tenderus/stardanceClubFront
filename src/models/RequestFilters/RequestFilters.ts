import { Filter } from "./Filter";

export interface RequestFilters{
    logicalOperators : number;
    filters : Filter[];
}