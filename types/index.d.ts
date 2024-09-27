y

interface IAuthenticatedUser {
    email: string
    name: string
}

export interface IColor {
    name: string
    id: string
    code: string
}

export interface IIcon {
    name: string
    id: string
    symbol: string
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface CreateError {
    name: string;
    isFixed: boolean;
    language: string;
    image?: string;
    color: string;
    type: string; // 'type' artık zorunlu
}

export interface ICreateErrorRequest {
    name: string;
    isFixed: boolean;
    language: string;
    image?: string | null;
    color?: string;
    type: string;
}