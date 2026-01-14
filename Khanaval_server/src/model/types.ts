export interface Iuser {
    id?:string,
    first_name:string,
    last_name:string,
    number:string,
    emailId:string
    user_type?:string
    imageUrl:string
}
export interface IProvider {
    id?:string,
    OwnerName:string,
    number:string,
    otp:string
    user_type?:string
    MessRegister:boolean
}

export  interface JwtToken {
    _id:string
}