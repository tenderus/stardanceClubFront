export interface PaginatedResult<T>{
    pageIndex : number;
    pageSize : number;
    total : number;
    items : T[];
}