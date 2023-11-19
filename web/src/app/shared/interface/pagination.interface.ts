export interface Pagination {
    currentPage: number,
    perPage: number,
    totalPages: number,
    totalItems: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}