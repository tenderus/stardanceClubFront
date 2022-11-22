import {Expression} from "./Expression";

export interface Filter{
    path : string;
    value : string | null;
    expression : Expression;
}