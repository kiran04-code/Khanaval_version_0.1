import { gql } from "@apollo/client";
export const VERIFIED_USER_GOOGLE  = gql`
query VerifiedUserGoogle($payload: signupinput!) {
  verifiedgoodtokenandnumberforSignup(payload: $payload) {
    success
    token
    message
  }
  
}
`
export const VERIFIED_USER_GOOGLE_LOGIN  = gql`
query VerifiedUsersigninGoogle($token: String!) {
  verifiedgoodtokenandnumberforSignin(token: $token) {
    success
    token
    message
  }
  
}
`

export const GET_CURRENT_USER = gql`
query GetcurrentUser{
  getcurrentUser{
    id,
  number,
  first_name,
  last_name,
  emailId,
  imageUrl
  }
}

`
