export interface Persona {
    guid?: any;
    identification: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    userType: UserType;
}

export enum UserType{
    Admin,
    User
}
