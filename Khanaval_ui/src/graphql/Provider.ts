import { gql } from "@apollo/client";

export const PROVIDER_OTP_SIGNUP_QUERY = gql`
query ProviderverficationOTPQuery($number:String!){
    ProviderverficationOTP(number:$number){
        success,
        message
    }
}
`
export const PROVIDER_OTP_SIGNUP_VERYFIED_QUERY = gql`
query ProviderverficationQuery($payload:signupinputp!){
    Providerverfication(payload:$payload){
        success,
        message,
        token
    }
}
`
export const PROVIDER_OTP_LOGIN_QUERY= gql`
query ProviderverficationOTPQueryFORLogin($number: String!){
    ProviderverficationOTPLogin(number: $number){
        success,
        message
    }
}
`
export const PROVIDER_OTP_LOGIN_VERYFIED_QUERY= gql`
query ProviderverficationQueryFORLogin($payload: loginpinputp!){
    ProviderverficationLogin(payload: $payload){
        success,
            message,
            token
    }
}
`
export const PROVIDER_CURRENT_DATA= gql`
query GetCurrentData{
    getProviderdata {
    id,
    OwnerName,
    number,
    MessRegister,
  }
}
`

export const CREATE_MESS_FOR_PROVIDER = gql`
mutation Createmesforprovider($payload:CreateMessdata!){
    CreateMessProvider(payload:$payload){
        success,
        message
    }
}`
export const GET_MY_MESS = gql `
query GetcurentMessdata{
     getproviderMessData {
     id,
     identity {
      name
      startTime
      endTime
      dietaryType
      operatingMode
    }
    legal {
      fssaiNumber
    }
    media {
      cover
      kitchen
      dining
    }
    location {
      address
      houseNo
      society
      landmark
      suburb
      city
      state
      postcode
      lat
      lng
    }
    messVerified
    createdAt
    MessQrcode
    Menu {
        _id
      types
      imageUrl
      CreateAt
    }
    }
  }

`