import { Pagination } from "app/shared/interface/pagination.interface"

export interface List {
    data: User[],
    pagination: Pagination
}

export interface User {
    id: number,
    kh_name: string,
    en_name: string,
    phone: string,
    email?: string,
    username: string,
    tg_username: string,
    is_active: 1 | 0,
    about: string,
    avatar: string,
    last_activity: Date,
    vpn_account: string,
    department: {
        id: number,
        kh_nama: string,
        en_name: string
    }
    position: {
        id: number,
        kh_name: string,
        en_name: string
    },
    role: {
        id: number,
        en_name: string,
        kh_name: string
    },
    office: {
        id: number,
        en_name: string,
        kh_name: string
    },
    title: {
        id: number,
        en_name: string,
        kh_name: string
    }

    updated_at: Date,
    cover: string
}

export interface RequestUser {
    // User Info
    avatar: string,
    kh_name: string,
    en_name: string,
    username: string,
    vpn_account: string,
    department_id: number,
    title_id: number,
    office_id: number,
    position_id: number,
    role_id: number,
    about: string,
    // Security
    password: string,
    confirm_password: string,
    // Contact
    email: string,
    phone: string,
    tg_username: string,
}

export interface ResponseUser {
    statusCode: string,
    data: User,
    message: string
}

export interface ReqPutPassword {
    newPassword: string,
    newConfirmPassword: string
}

export interface ResPutPassword {
    statusCode: number,
    message: string
}

export interface ResponseSetup {
    success: boolean,
    setup: Setup
}

export interface Setup {
    departments: Organization,
    roles: Organization,
    titles: Organization,
    offices: Organization,
    positions: Organization,
}

interface Organization {
    id: number,
    kh_name: string,
    en_name: string
}