export interface Page<T> {
    content: T[];
    pageable: any;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort?: any;
    first: boolean;
    numberOfElements: number;
}