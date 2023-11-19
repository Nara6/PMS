import { User } from "../user/user.types";

interface UserLogin extends User {
    role: { en_name: string },
    // title: { en_name: string };
    // position: { en_name: string },
    // department: { en_name: string },
    // office: { en_name: string },
}

export interface ResponseLogin {
    success: boolean,
    token_type: string,
    token: string,
    user: UserLogin,
}