import { Pagination } from "app/shared/interface/pagination.interface"

export interface List {
    data: Data[],
    pagination: Pagination
}

export interface Data {
    id: number,
    name: string,
    public_ip: string,
    env: {
        id: number;
        name: string;
    },
    projectsAppEnvs: [];
    VMAccess: [];
    created_at: Date
}

export interface Detail {
    id: number,
    unit_price: number,
    qty: number,
    product_id: number,
    product: {
        id: number,
        name: string,
    }
}