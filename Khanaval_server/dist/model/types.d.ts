export interface Iuser {
    id?: string;
    first_name: string;
    last_name: string;
    number: string;
    emailId: string;
    user_type?: string;
    imageUrl: string;
    Subscriber?: boolean;
    FCMtoken?: string;
}
export interface IProvider {
    id?: string;
    OwnerName: string;
    number: string;
    user_type?: string;
    MessRegister: boolean;
    FCMtoken: string;
}
export interface JwtToken {
    _id: string;
}
export interface JwtTokeninput {
    id: string;
}
//# sourceMappingURL=types.d.ts.map