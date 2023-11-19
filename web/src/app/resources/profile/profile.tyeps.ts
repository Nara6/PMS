export interface ReqUpdateProfile {
    name: string,
    avatar: string,
    phone: string,
    email?: string
}

export interface ResUpdateProfile {
    access_token: string,
    message: string
}

export interface ReqUpdatePassword {
    old_password: string,
    password: string,
    confirm_password: string
}

export interface ResUpdatePassword {
    statusCode: string,
    message: string
}